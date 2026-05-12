const ipConfig = async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (ip.includes("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }
  res.json({ ip });
};
export { ipConfig };
