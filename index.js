const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send({
        message: "Hello!",
        endpoints: {
            pomodoroTimer: {
                method: "GET",
                path: "/pomodoro/:work-:break",
                description: "Starts a Pomodoro timer with custom work and break durations. Replace ':work' and ':break' with the number of minutes."
            }
        }
    });
});

app.get('/pomodoro/:work-:break', (req, res) => {
    const workMinutes = parseInt(req.params.work, 10);
    const breakMinutes = parseInt(req.params.break, 10);

    if (isNaN(workMinutes) || isNaN(breakMinutes) || workMinutes <= 0 || breakMinutes < 0) {
        res.status(400).send({ error: 'Invalid work or break duration. Please provide positive numbers.' });
    } else {
        const currentTime = new Date();
        const workEndTime = new Date(currentTime.getTime() + workMinutes * 60000);
        const breakEndTime = new Date(workEndTime.getTime() + breakMinutes * 60000);

        res.send({
            message: `Pomodoro Timer Started`,
            workDuration: `${workMinutes} minutes`,
            breakDuration: `${breakMinutes} minutes`,
            workEndsAt: workEndTime.toLocaleTimeString(),
            breakEndsAt: breakEndTime.toLocaleTimeString(),
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
