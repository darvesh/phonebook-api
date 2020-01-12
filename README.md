# phonebook-api
Phonebook API to manage contacts 

## Setup

1. Clone this repository `git clone https://github.com/solooo7/phonebook-api.git`
2. Fill in config files in config folder
3. Install dependencies: `npm install`.
4. Run for development: `npm run dev`.
5. Run for production: `npm start`.
6. To run test: `npm test`
## API

**Add a new contact:**
 
```
POST /
```
Body:

- `firstname`: {String}.
- `lastname`: {String}
- `phone`: {String} Phone Number [en-IN].
- `secondaryphone` (optional) : {String} Phone Number [en-IN].
- `email` (optional): {String}.
- `company` (optional): {String}.
- `group` (optional): {String}.
- `favourite` (optional):{Boolean}.

Returns:
```
{
  success: {Boolean}
  data: {Object} newly added contact
}
```


**Get all contacts:**

```
GET /?firstname=fname&lastname=sname&email=email&company=company&group=friends
```
Returns:
```
{
  success: {Boolean}
  data: {Array<Contact>} list of all contacts
}
```
**Get a contact by id:**
```
GET /:id
```
Params:
- `id`: {String} MongoDB ObjectId.

Returns:
```
{
  success: {Boolean}
  data: {Object} contact
}

```
**Update a contact by id:**
```
PATCH /
```
Body:
- `id`: {String} MongodDB ObjectId
- `firstname`(optional): {String}.
- `lastname`(optional): {String}
- `phone`(optional): {String} Phone Number [en-IN].
- `secondaryphone` (optional) : {String} Phone Number [en-IN].
- `email` (optional): {String}.
- `company` (optional): {String}.
- `group` (optional): {String}.
- `favourite` (optional):{Boolean}.

Returns:
```
{
  success: {Boolean}
  data: {Object} Contact before updating.
}
```

**Delete a contact by id:**
```
DELETE /:id
```
Params:
- `id`: {String} MongoDB ObjectId.

Returns:
```
{
  success: {Boolean}
  message: {String}
  data: {Object} Deleted contact
}
```
