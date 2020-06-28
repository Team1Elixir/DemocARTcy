module.exports = (err,req,res,next) => {

  if (err.name == 'JsonWebTokenError') {
    res.status(401).json({
      error: 'please login first'
    })
  } else if (Array.isArray(err.errors)) {
    let error = err.errors.map(error => {
      return error.message
    })
    const errorMsg = error.join(', ')
    res.status(400).json({
        error: errorMsg
    })
  } else if (err.type === 'StripeInvalidRequestError') {
    res.status(err.statusCode).json({
      error: err.raw.message
    })  
  } else {
    res.status(err.code || 500).json({
      error: err.message || err.msg || err
    })
  }
}   