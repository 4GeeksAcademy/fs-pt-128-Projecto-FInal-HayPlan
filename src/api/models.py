from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey, Column, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

group_members = Table(
    "group_members", db.metadata,
    Column("user_id",  db.Integer, ForeignKey("user.id"),  primary_key=True),
    Column("group_id", db.Integer, ForeignKey("group.id"), primary_key=True),
)

class Group(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    icon: Mapped[str] = mapped_column(String(1), default="🥳​")
    admin_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), nullable=False)

    admin: Mapped["User"] = relationship(
        "User", foreign_keys=[admin_id], back_populates="groups_admin")
    members: Mapped[List["User"]] = relationship(
        "User", secondary=group_members, back_populates="groups")
    
    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "icon": self.icon,
            "admin_id": self.admin_id,
            "admin_username": self.admin.username if self.admin else None,
            "member_count": len(self.members),
            "members": [{"id": member.id, "username": member.username} for member in self.members]
        }