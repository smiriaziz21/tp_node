![image](https://roam-smart.com/wp-content/uploads/unified-roaming-platform.png)

#  Carcasse Node Express Mongo Project



You can call the function logger(req, level, full_message, message) anywhere in the project to send the log to graylog .
Paramaters :
- req : the whole request
- level : number from 0 to 6
- full_message : the full error message
- message : the minified error message

## http status codes
| STATUS | MESSAGE                                                                                                |
|--------|--------------------------------------------------------------------------------------------------------|
| `200`  | success                                                                                                |
| `201`  | success and new entry created                                                                          |
| `204`  | success but response is empty                                                                          |
| `209`  | not updated, may because of new values equal to old values                                                   |
| `210`  | params sent are not valid comparing to data saved in DB but the server handled it |
| `401`  | token errors (missing, invalid, expired ..) you should try relogin before contacting backend developer |
| `403`  | you dont have permission, check the role                                                               |
| `422`  | request params or body are malformed, reload this doc for any changes of attributes names              |
| `423`  | wrong password              |
| `424`  | entry duplication               |
| `461`  | a unique constraint error               |
| `445`  |You can't accept a replacement without selecting a replacer               |
| `462`  | not allowed, check your allowed features               |
| `522`  | database fail, you should contact backend developer               |
| `523`  | operation error, redoing the action with different parameters may succeed (it may be temporary error)               |
| `524`  | operation error but it can be overrided, headers.force=true required to override               |


| HTTP METHODS | COLOR                                                                                                |
|--------|--------------------------------------------------------------------------------------------------------|
| POST  | &#x1F4D8;|
| GET  | &#x1F4D7;|
| PUT  | &#x1F4D9;|
| DELETE  | &#x1F534;|

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




# &#x1F4D8; Create Project Sprint

``` POST
localhost:5003/unified/projectSprint
```

Create Project Sprint
### body
```
{ project_id:"" }

```

### Response

```
{'Project Sprint saved'}
```
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------


# &#x1F534; Get  Project Sprint bu customer

``` POST
localhost:5003/unified/projectSprint
```

Get my Project Sprint 


### Response

```
    return object key(status) value(cards)
```
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------


# &#x1F4D8; Add tab to Project Sprint

``` PUT
localhost:5003/unified/projectSprint/addTabToProjectSprint
```

Add tab to Project Sprint


### body
```
{"id":"","status":""}

```

### Response

```
if id ==null it will add a new tab with the value fi status
else if the status will remove the tab with the same id
else will update the status if tab with the same id 
```

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# &#x1F4D8; switch card

``` POST
localhost:5003/unified/projectSprint/change-status
```

Add user to card
### body
```
{"cardId":"","cardStatus":{"id":"","status":"","old":""}}
```

### Response

```
it will delete the card from the old status and add it to the the status by id

```
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# &#x1F4D8; save card

``` PUT
localhost:5003/unified/card/saveCard
```

save card
### body
```
{"card":"61f3db5d8177e2c2aaaf6e05","usAdd":true,"users":[]}
OR
{"card":"61f3db5d8177e2c2aaaf6e05","comment":"te","commentDate":"2022-01-28T13:42:21.421Z","idCm":null}
```

### Response

```
if usAdd it will save the users array to the card 
OR
if idCm is null it will add the comment to the card comments
else it will delete the comment from the card 

```
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# &#x1F4D8; remove card

``` DELETE
localhost:5003/unified/rmCard/:id
```

remove card


### Response

```
return the current project sprint

```
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
