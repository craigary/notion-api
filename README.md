# Notion API

A simple Notion API for reading your Notion page or database data, encapsulated from [`notion-client`](https://github.com/NotionX/react-notion-x/tree/master/packages/notion-client).

You can use `notion-api.craigary.net` as the end point, or deploy it on Vercel for your instance.

---

## Show Database

Returns `json` data about the database.

- **URL:** /api/v0/databases/:id?v=viewId
- **Method:** `GET`

[`https://notion-api.craigary.net/api/v0/databases/7b260b7dc90548c3bc1eb5d7a41f20bd?v=f21cc1857c564c4aa94477274be5233f`](https://notion-api.craigary.net/api/v0/databases/7b260b7dc90548c3bc1eb5d7a41f20bd?v=f21cc1857c564c4aa94477274be5233f)

## Request

### URL Params

| Param |  Type  | Description | Required |
| :---: | :----: | :---------: | :------: |
|  id   | String | Database ID |   Yes    |
|   v   | String |   View ID   | Optional |

## Response

### Success Response:

- **Code:** 200

  <details>
    <summary>Example</summary>

  ```json
  {
    "type": "database",
    "id": "7b260b7d-c905-48c3-bc1e-b5d7a41f20bd",
    "title": "Overexposed",
    "metadata": {
      "locked": false,
      "created_time": 1619099348726,
      "last_edited_time": 1619256540000
    },
    "data": [
      {
        "id": "5b2f0b64-3357-480a-97a9-7c7f57eee028",
        "Type": ["Podcast"],
        "Publisher": ["Bon Appetit"],
        "Publishing/Release Date": {
          "time_zone": "Asia/Shanghai",
          "start_date": "2021-04-24",
          "start_time": "00:00"
        },
        "Status": ["Ready to Start"],
        "Name": "Bon Appétit Foodcast"
      },
      {
        "id": "d897338a-1f3e-4a52-b757-253c51a4d182",
        "Type": ["Article"],
        "Publisher": ["NYT"],
        "Summary": "Some think chief ethics officers could help technology companies navigate political and social questions.",
        "Publishing/Release Date": {
          "start_date": "2018-10-21"
        },
        "Link": "https://www.nytimes.com/2018/10/21/opinion/who-will-teach-silicon-valley-to-be-ethical.html",
        "Status": ["Ready to Start"],
        "Author": ["Kara Swisher"],
        "Name": "Who Will Teach Silicon Valley to Be Ethical? "
      }
    ]
  }
  ```

  </details>

### Error Response:

- **Code:** 404 Not Found
- **Content:** `{"message":"invalid notion pageId \"abcde\""}`

OR

- **Code:** 406 Not Acceptable
- **Content:** `{"message":"pageId \"f77ec408-a800-486c-93ff-e47a11e20061\" is not a database"}`

---

## Show Page

Returns `json` data about page content block and page properties (if available)

- **URL:** /api/v0/pages/:id
- **Method:** `GET`

[`https://notion-api.craigary.net/api/v0/pages/5b2f0b643357480a97a97c7f57eee028`](https://notion-api.craigary.net/api/v0/pages/5b2f0b643357480a97a97c7f57eee028)

## Request

### URL Params

| Param |  Type  | Description | Required |
| :---: | :----: | :---------: | :------: |
|  id   | String |   Page ID   |   Yes    |

## Response

### Success Response:

- **Code:** 200
- **Content:**

  <details>
    <summary>Example</summary>

  ```json
  {
    "type": "page",
    "id": "9ad2db2f-bcb2-4af3-897f-187882d6404d",
    "title": "General Magic the Movie",
    "metadata": {
      "page_full_width": true,
      "page_font": "serif",
      "page_small_text": true,
      "created_time": 1619099348726,
      "last_edited_time": 1619259240000
    },
    "block": {
      "9ad2db2f-bcb2-4af3-897f-187882d6404d": {},
      "7b260b7d-c905-48c3-bc1e-b5d7a41f20bd": {},
      "fec1f7c7-a5d7-4f1e-bbd1-729dc47e5abd": {},
      "bca317b2-578e-4db2-9a57-fb6bd4ee0a21": {},
      "ae05ee3f-9e5e-4c21-a8a9-6c6120e1d3bc": {},
      "57e8e79a-c801-4d7f-a58f-db9b4d1ea306": {},
    "properties": {
      "Score /5": [
        "⭐️⭐️⭐️⭐️⭐️"
      ],
      "Type": [
        "Film"
      ],
      "Publisher": [
        "Indie"
      ],
      "Publishing/Release Date": {
        "start_date": "2021-04-16"
      },
      "Link": "https://www.generalmagicthemovie.com/",
      "Status": [
        "Finished"
      ],
      "Name": "General Magic the Movie"
    }
  }
  ```

  </details>

### Error Response:

- **Code:** 404 Not Found
- **Content:** `{"message":"invalid notion pageId \"abcde\""}`

OR

- **Code:** 406 Not Acceptable
- **Content:** `{"message":"pageId \"7b260b7d-c905-48c3-bc1e-b5d7a41f20bd\" is not a page"}`

### Note

you can render these data with [`react-notion`](https://github.com/splitbee/react-notion) or [`react-notion-x`](https://github.com/NotionX/react-notion-x).

## License

The MIT License.

## Shameless Plug

Check [Nobelium](https://github.com/craigary/nobelium), A static blog build on top of Notion and Nextjs, deployed on Vercel.
