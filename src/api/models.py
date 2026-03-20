from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey, Enum, DateTime, Integer, Float, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from datetime import datetime, timezone
from typing import List
from flask_bcrypt import generate_password_hash, check_password_hash
import secrets

db = SQLAlchemy()

class PlanStatus(enum.Enum):
    PROPUESTA = "propuesta"
    VOTACION = "votacion"
    CONFIRMADO = "confirmado"
    ACTIVO = "activo"
    CERRADO = "cerrado"

# PF
# tabla auxiliar compuesta por PK-> user.id & PK -> group.id 
# Relacion muchos a muchos
group_members = db.Table(
    "group_members",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("group_id", db.Integer, db.ForeignKey("group.id"), primary_key=True)
)
    
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(nullable=False)  
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False) 
    
    # CAMPOS PARA PERFIL
    first_name: Mapped[str] = mapped_column(String(100), nullable=True)
    last_name: Mapped[str] = mapped_column(String(100), nullable=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    birthday: Mapped[datetime] = mapped_column(Date, nullable=True)
    gender: Mapped[str] = mapped_column(String(20), nullable=True)
    city: Mapped[str] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(100), nullable=True)
    profile_picture: Mapped[str] = mapped_column(String(100), nullable=True, default="fa-user")

    #PF
    admin_groups: Mapped[List["Group"]] = relationship("Group", back_populates="admin")
    groups: Mapped[List["Group"]] = relationship("Group", secondary=group_members, back_populates="members")
    plans_organizer: Mapped[List["Plan"]] = relationship("Plan", back_populates="organizer") #esta relacion nos permite completar estadisticas de un usuario relacionado a planes. 
    # --PF

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):      
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            # do not serialize the password, its a security breach
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_picture": self.profile_picture,
            "phone": self.phone,
            "birthday": self.birthday.strftime('%Y-%m-%d') if self.birthday else None,
            "gender": self.gender,
            "city": self.city,
            "country": self.country
        }


class Plan(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    group_id: Mapped[int] = mapped_column(ForeignKey("group.id"), nullable=False)
    organizer_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    status: Mapped[PlanStatus] = mapped_column(Enum(PlanStatus), default=PlanStatus.PROPUESTA)
    location: Mapped[str] = mapped_column(String(120), default="")
    date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    group: Mapped["Group"] = relationship("Group", back_populates="plans")
    organizer: Mapped["User"] = relationship("User", back_populates="plans_organizer")
    votes: Mapped[List["Vote"]] = relationship("Vote", back_populates="plan", cascade="all, delete-orphan")
    memories: Mapped[List["PlanMemory"]] = relationship("PlanMemory", back_populates="plan", cascade="all, delete-orphan")
    # Falta en Plan:
    expenses: Mapped[List["Expense"]] = relationship("Expense", back_populates="plan", cascade="all, delete-orphan")
    ratings: Mapped[List["PlanRating"]] = relationship("PlanRating", back_populates="plan", cascade="all, delete-orphan")

    def serialize(self):
        average_rating = None
        if self.ratings:
            average_rating = round(sum(rating.score for rating in self.ratings)/len(self.ratings), 1)
        
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "group_id": self.group_id,
            "group_name": self.group.name,
            "organizer_id": self.organizer_id,
            "organizer_username": self.organizer.username,
            "status": self.status.value,
            "location": self.location,
            "date": self.date.isoformat(),
            "created_at": self.created_at.isoformat(),
            "rating": average_rating,
            "rating_count": len(self.ratings)
        }

class Vote(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("plan.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    vote: Mapped[bool] = mapped_column(Boolean, nullable=False)

    plan: Mapped["Plan"] = relationship("Plan", back_populates="votes")
    voter: Mapped["User"] = relationship("User")

    def serialize(self):
        return {
            "id": self.id,
            "plan_id": self.plan_id,
            "user_id": self.user_id,
            "username": self.voter.username,
            "vote": self.vote
        }
    
class PlanRating(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("plan.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=False)

    plan: Mapped["Plan"] = relationship("Plan", back_populates="ratings")
    user: Mapped["User"] = relationship("User")

    def serialize(self):
        return{
            "id": self.id,
            "plan_id": self.plan_id,
            "user_id": self.user_id,
            "score": self.score
        }
    
class PlanMemory(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("plan.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    comment: Mapped[str] = mapped_column(String(500), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    plan: Mapped["Plan"] = relationship("Plan", back_populates="memories")
    user: Mapped["User"] = relationship("User")

    def serialize(self):
        return {
            "id": self.id,
            "plan_id": self.plan_id,
            "user_id": self.user_id,
            "username": self.user.username,
            "comment": self.comment,
            "created_at": self.created_at.isoformat()
        }
    
class Expense(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("plan.id"), nullable=False)
    paid_by_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)

    plan: Mapped["Plan"] = relationship("Plan", back_populates="expenses")
    paid_by: Mapped["User"] = relationship("User")
    
    def serialize(self):
        return {
            "id": self.id,
            "plan_id": self.plan_id,
            "paid_by_id": self.paid_by_id,
            "paid_by": self.paid_by.username,
            "description": self.description,
            "total_amount": self.total_amount
        }

# PF

def generate_invite_code():
    code = secrets.token_hex(4).upper()

    while Group.query.filter_by(invite_code = code).first():
        code = secrets.token_hex(4).upper()
    return code

class Group(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    invite_code: Mapped[str] = mapped_column(String(8), unique=True, nullable=False, default=lambda: generate_invite_code())
    admin_id: Mapped[int]= mapped_column(ForeignKey("user.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    #relaciones
    admin: Mapped["User"] = relationship("User", back_populates="admin_groups")
    members: Mapped[List["User"]] = relationship("User", secondary=group_members, back_populates="groups")
    plans: Mapped[List["Plan"]] = relationship("Plan", back_populates="group", cascade="all, delete-orphan")

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "invite_code": self.invite_code,
            "admin_id": self.admin_id,
            "admin_username": self.admin.username,
            "created_at": self.created_at.isoformat()
        }
    # --PF
