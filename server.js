import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello from investment tracker app' });
});

app.listen(3768, () => {
    console.log('Hey mate on port 3768');
});
