const users = [
    {
        name: "Example name",
        email: "contato@example.dev",
        password: "123456admin"
    }
]

const publicPost = [
    {
        type: "public",
        title: "Post 1: This is a title example",
        content: "And this is a content example for a test"
    },
    {
        type: "public",
        title: "Post 2: This is a title example",
        content: "And this is a content example for a test"
    },
    {
        type: "public",
        title: "Post 3: This is a title example",
        content: "And this is a content example for a test"
    }
]

const privatePost = [
    {
        type: "private",
        title: "Post 1: This is a title example",
        content: "And this is a content example for a test"
    },
    {
        type: "private",
        title: "Post 2: This is a title example",
        content: "And this is a content example for a test"
    },
    {
        type: "private",
        title: "Post 3: This is a title example",
        content: "And this is a content example for a test"
    }
]

module.exports = { users, publicPost, privatePost }