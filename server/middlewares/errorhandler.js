module.exports = (err, req, res, next) => {
  console.log('Error caught by error handler!');
  console.log(err);
  let status = err.status || 500;
  let message = err.msg || 'Internal server error';
  res.status(status).json({ message });
}