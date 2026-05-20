import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis-queue.js";
import sendEmail from "../../utils/sendEmail.js";

new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { to, subject, html } = job.data;

      await sendEmail({
        to,
        subject,
        html,
      });
    } catch (error) {
      console.log("EMAIL ERROR:");
      console.log(error);
    }
  },
  {
    connection: redisConnection,
  },
);
