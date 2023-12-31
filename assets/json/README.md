# Music

The music data object must return two main keys : `artists` and `releases`.
The artists key holds an array of artist item (described later). These artists items must be sorted by released material date. At the array starts, is the artist that is the latest that did a release on the label. It means that each time an artist do a release, it automatically goes on the first index, and makes all other artists shift.

## Artist item



### Global info

- The `mainLink` string is the artist's url to be used as the main entry point

### Releases

The artist object might contain a release key, which hold an array of strings. Those strings must strictly represent the catalog number, and those releases number must be ordered by released date, the most recent at the first index (ie the oldest at the last index).

### Supported links type 

here is the list of supported types. For any new link type addition, ensure there is an associated logo in `assets/img/logo`.

`amazon`, `apple`, `bandcamp`, `deezer`, `discogs`, `facebook`, `flickr`, `github`, `instagram`, `linkedin`, `mixcloud`, `soundcloud`, `spotify`, `tidal`, `twitter`, `youtube`


# Events

Events must be sorted by date, most recent being the first index.
