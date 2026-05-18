import amqp from "amqplib";

let channel;

export const connectQueue = async () => {
  const connection =
    await amqp.connect("amqp://localhost");

  channel = await connection.createChannel();

  await channel.assertQueue("notifications");
};

export const publishToQueue = async (
  message
) => {
  channel.sendToQueue(
    "notifications",
    Buffer.from(JSON.stringify(message))
  );
};

export { channel };