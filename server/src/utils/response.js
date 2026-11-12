export function sendSuccess(res, data = null, message = 'Success', statusCode = 200, meta = null) {
  const responseBody = {
    success: true,
    message,
    data,
  };

  if (meta) {
    responseBody.meta = meta;
  }

  return res.status(statusCode).json(responseBody);
}

export function sendError(res, message = 'An error occurred', statusCode = 500, code = 'ERROR', details = null) {
  const responseBody = {
    success: false,
    error: {
      message,
      code,
      statusCode,
    },
  };

  if (details) {
    responseBody.error.details = details;
  }

  return res.status(statusCode).json(responseBody);
}
