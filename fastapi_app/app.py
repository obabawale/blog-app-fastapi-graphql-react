import strawberry
from enum import Enum
from typing import List, Optional
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from fastapi.middleware.cors import CORSMiddleware


@strawberry.enum
class UserType(Enum):

    PUBLIC = "public"

    INTERNAL = "internal"

    PORTAL = "portal"

# 1. Database Model Mocking (User & Post tables)


@strawberry.type
class Post:
    id: int
    title: str
    content: str


@strawberry.type
class User:
    id: int
    name: str
    email: str
    user_type: UserType

    # This relational resolver handles getting data from the Post table
    @strawberry.field
    def posts(self) -> List[Post]:
        return [
            Post(
                id=p["id"],
                title=p["title"],
                content=p["content"],
            )
            for p in MOCK_POSTS_DB
            if p["user_id"] == self.id
        ]


# 2. Mock Data Store
MOCK_USERS_DB = {
    1: User(
        id=1,
        name="Alice",
        email="alice@example.com",
        user_type=UserType.PUBLIC
    ),
    2: User(
        id=2, name="Bob",
        email="bob@example.com",
        user_type=UserType.INTERNAL
    ),
    3: User(
        id=3,
        name="James",
        email="james@example.com",
        user_type=UserType.PORTAL
    ),
}

MOCK_POSTS_DB = [
    {"id": 101, "title": "GraphQL Tips",
        "content": "Keep schemas unified.", "user_id": 1},
    {"id": 102, "title": "React Guide",
        "content": "Use dynamic queries.", "user_id": 1},
    {"id": 103, "title": "Python Microframeworks",
        "content": "FastAPI is great.", "user_id": 2},
    {"id": 104, "title": "Advanced GraphQL",
        "content": "Use fragments wisely.", "user_id": 3},
]


@strawberry.type
class Query:
    # Endpoint 1: Get all users
    @strawberry.field
    def all_users(self) -> List[User]:
        return list(MOCK_USERS_DB.values())

    # Endpoint 2: Get a specific user by ID
    @strawberry.field
    def user_by_id(self, id: int) -> Optional[User]:
        return MOCK_USERS_DB.get(id)

    @strawberry.field
    def get_post_by_user_id(self, user_id: int) -> List[Post]:
        return [
            Post(
                id=p["id"],
                title=p["title"],
                content=p["content"],
            )
            for p in MOCK_POSTS_DB
            if p["user_id"] == user_id
        ]


schema = strawberry.Schema(query=Query)

# 4. Set up the FastAPI microframework and link the GraphQL route
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
