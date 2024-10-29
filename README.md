
# kuramanime-api
this is my first time web scraping, all this data API from [Kuramanime](https://kuramanime.bid/).

# Usage
1. Clone this repository
    ```bash
    git clone https://github.com/Kirara02/Kuramanime-API.git
    ```
2. Install dependecies (`yarn` or `npm install`)
    ```bash
    npm install
    ```
3. Start the development environment
    ```bash
    npm run dev or npm run start
    ```
4. visit http://localhost:8000 or another port if you changed it

### Get Ongoing Anime
Fetch a list of ongoing anime.

- **Endpoint**: `/api/v1/ongoing/:page`
- **Parameters**: `[page]` - Page number (1-3, depending on database)
- **Example**:
```
/api/v1/ongoing/1
```

### Get Completed Anime
Fetch a list of completed anime.

- **Endpoint**: `/api/v1/completed/:page`
- **Parameters**: `[page]` - Page number (1-46, depending on database)
- **Example**:
```
/api/v1/completed/1
```

### Get Anime List
Fetch a complete list of anime with optional search and pagination.

- **Endpoint**: `/api/v1/anime`
- **Query Parameters**:
- `q` (optional): Search query to filter anime by title.
- `page` (optional): Page number for pagination.
- **Example**:
```
/api/v1/anime?q=dandandan&page=1
```

### Get Anime Detail
Fetch detailed information about a specific anime.

- **Endpoint**: `/api/v1/anime/:id/:name`
- **Parameters**: `[id]` - Anime ID, `[name]` - Anime name
- **Example**:
```
/api/v1/anime/3149/kimi-wa-meido-sama
```

### Get Episode Detail
Fetch details for a specific episode of an anime, with options for choosing video server.

- **Endpoint**: `/api/v1/anime/:id/:name/episode/:no`
- **Parameters**:
   - `[id]` - The unique identifier for the anime.
   - `[name]` - The name of the anime.
   - `[no]` - The episode number.
- **Query Parameters**:
   - `server` (optional): Choose from one of the available servers `[kuramadrive, archive, archive-v2, filelions, filemoon, mega, streamtape]`.
      - Default is `kuramadrive`.
- **Example**:
    ```
    /api/v1/anime/3138/dandadan/episode/1?server=mega
    ```

