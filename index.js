const express = require('express')

const fs = require('./helpers');

require('dotenv/config');

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await fs.read();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, state } = req.body;

        const newUser = {
            name,
            city,
            state,
        };

        const currentUser = await fs.read();

        newUser.id = currentUser.length + 1;

        const updateUser = { ...currentUser, newUser };

        await fs.write(updateUser);

        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
    };
});

app.put('/users/:id', async (req, res) => {
    try {
        const { name, city, state } = req.body;

        const { id: userId } = req.params;

        const currentUser = await fs.read();

        const updateUser = { name: name, city, state };

        const foundUser = currentUser.find((u) => u.id === Number(userId));

        Object.assign(foundUser, updateUser);

        await fs.write(currentUser);

        return res.status(401).json(foundUser);
    } catch (error) {
        console.log(error.message);
    }
});

app.delete('/users/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const currentUser = await fs.read();

        const updateUser = currentUser.filter((u) => updateUser.id !== Number(id));

        await fs.write(updateUser);

        return res.status(204).end();
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`))