import express from 'express';
import resize from './routes/resize';
const app = express();

const port = 3000;

app.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send(`
  <h1 style="text-align:center;">Welcome to the Image Processing API</h1>
  <p style="text-align:center;"><a href="/resize">Click Here</a> to head to the Image resize API</p>
  `);
});

app.use(express.static('public'));

app.use(resize);
app.use((req: express.Request, res: express.Response): void => {
  res
    .status(404)
    .send(
      '<h1 style="text-align: center;"><span style="color: red;">Error 404:</span> Page not found :\'(</h1>'
    );
});

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(
    `Server is running on port: ${port}\n With URL http://localhost:3000`
  );
});

export default app;
