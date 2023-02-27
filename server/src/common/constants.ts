const LIMIT = 10;

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum USER_STATUS {
  ACTIVE,
  BLOCK,
}

enum GENDER {
  MALE,
  FEMALE,
  OTHER,
}

enum ORDER_STATUS {
  PENDDING,
  APPROVE,
  CANCLE,
}

enum ROLE {
  ADMIN,
  USER,
}

enum SORT_BY {
  HIGHT_TO_LOW,
  LOW_TO_HIGHT,
  NEWST,
}

enum VALIDATION_TYPE {
  QUERY,
  PARAMS,
  BODY,
  HEADER,
}

enum STATUS_PRODUCT {
  ACTIVE,
  DELETE,
  OUT_OF_STOCK,
}

export { LIMIT, HTTP_METHOD, USER_STATUS, ORDER_STATUS, ROLE, SORT_BY, VALIDATION_TYPE, STATUS_PRODUCT, GENDER };