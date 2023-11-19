# The progect describes top 20 courses

## https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-handle-errors-gracefully-and-return-standard-error-codes

###

When testing product with reviews, in mongoDB the "productId" field by default is string, but should be converted to ObjectId(). It is possible to change type manually from compas and then the request with getting a product with appropriate reviews will be correct, otherwise some reviews can be missed.
