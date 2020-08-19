# Cloud Stay - Photo Gallery Module API

This API was built to provide the Cloud Stay App access to each property's photos so users can view the photos of the rooms they are interested in renting.

## Scalability

By using 8 AWS servers with Nginx load balancer,

The back-end system is able to handle a throughput of ~700 request per second with <10ms latency and <1% error rate.

![](https://i.imgur.com/zYFIdZF.png)


## API for Photo Gallery

### Get Room's Photo Gallery
  * GET `/api/rooms/{room_id}/photos`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "room_id": "Number",
      "room_photos": [
        {
        "photoId": "String",
        "photoUrl": "String",
        "photoName": "String",
        "description": "String"
        },
      ],
    }
```

### Add Photos To The Room's Photo Gallery
  * POST `/api/rooms/{room_id}/photos`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    { "room_Id": "Number",
      "photos":[
        {
          "photoUrl": "String",
          "photoName": "String",
          "description": "String",
        }
      ]
    }
```


### Update/Replace One Photo
  * PUT `/api/rooms/{room_id}/photos/{photo_id}`

**Path Parameters:**
  * `room_id` room's id
  * `photo_id` Photo's Id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
        "photoUrl": "String",
        "photoName": "String",
        "description": "String"
    }
```

### Delete One Photo
  * DELETE `/api/rooms/{room_id}/photos/{photo_id}`

**Path Parameters:**
  * `room_id` room's id
  * `photo_id` photo's id
**Success Status Code:** `204`




## API for Favorite Rooms List

### Get Users' Favorite Lists
  * GET `/api/rooms/{room_id}/save`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      _id: "Number",
      listName: 'String',
      saved: 'Boolean',
    }
```

### Save Room To Favorite List
  * GET `/api/rooms/{room_id}/save`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      listName: 'String',
      saved: 'Boolean',
      roomId: 'Number',
    }
```

### Update Room's Status In Favorite List
  * PUT `/api/rooms/{room_id}/save`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      saved: 'Boolean',
      _id: 'Number',
    }
```

### Delete Favorite List
  * DELETE `/api/rooms/{room_id}/save`

**Path Parameters:**
  * `room_id` room's id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      _id: 'Number',
    }
```

