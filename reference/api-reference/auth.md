# Auth

## 1. login API

{% swagger baseUrl="https:/www.kudog.email" method="post" path="/auth/login" summary="로그인" %}
{% swagger-description %}
로그인 성공 시 accessToken과 refreshToken 발
{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" type="string" %}
유저의 이메
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" type="string" %}
유저의 비밀번호
{% endswagger-parameter %}

{% swagger-response status="200" description="User login success" %}
accessToken : 30분\
refreshToken : 한 달&#x20;

```javascript
{
    "isSuccess": true,
    "code": 1000,
    "message": "success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY2MzU5MzY1MCwiZXhwIjoxNjYzNTk1NDUwfQ.eGwHkT5HS715rIchOs1HAZ5L8FnZHnXiFxWJyt8Ljm0",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY2MzU5MzY1MCwiZXhwIjoxNjY2MTg1NjUwfQ.pQ6Pn6h41oRe_lX4TLXAPAkA6uXCXUCanu0rK8rW31E"
    }
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="email or password 형식이 잘못된 경우" %}
```javascript
{
   isSuccess: false,
   code: 2004,
   message: "The email or password format is wrong"
}
```


{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="해당 email이 없는 경우 " %}
```javascript
{
   isSuccess: false,
   code: 2002,
   message: "email does not exist",
 }
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="비밀번호가 잘못된 경우" %}
```javascript
{
    isSuccess: false,
    code: 2003,
    message: "invalid password",
  }
```
{% endswagger-response %}
{% endswagger %}
