export default ({ errors }) =>
  (err, req, res, next) => {
    if (err instanceof errors.BaseError) {
      return res.status(err.getCode()).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  };
