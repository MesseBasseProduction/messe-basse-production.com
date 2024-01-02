# Backend requirements

In order to migrate this website from static to dynamic, a backend server and its associated database are required. Regardless of the used technology, there are several API endpoint, as well as administrations pages that are required to make it into production. First we'll have a look on the data required in the frontend, and the formatting associated, which might give serious hints about how to conceive the backend database model.

## Database objects

This website handle several objects, from different nature. We'll review them with no specific nor importance order. The following requirement are only meant to make the frontend works, to see about the administration panel and how to edit those objects, please refer to the Admin section.

### Organization bureau, members and documents

For the `Contact` page, there are several information that are required to make the page properly and fully load. They should all be retrieved under the same API endpoint, probably a GET one, which might return an object that looks like `assets/json/data/contact.json`.

- The `organization` key hold general information about the organization. Provided fields are a start, and some additionnal fields might come in the following drops.

- The `leaders` array should contain object, that we'll name `Person` in the following, that defines the persons in charge for the given exercice. The `members` array holds the same kind of `Person` objects, and refer to the associated people of the origanization. Finally, `pastMembers` also contains the same kind of `Person` object.

  The `Person` object should contains a `name` as a `String`, a `role` as a `String` (maybe a Enum might be worth the define between front and back, so far there are `president`, `treasurer`, `secretary`, `infra`, `dev`, `communication`, `apparel`) and an `image` as a `String`, which points to the associated, assets image path.

  The `Person` image is stored as `webp`, with a size of 512 x 512.

- The `documents` key contains `Document` objects, which refer to public and useful data concerning the organization. This `Document` object should contain a `name` as a String, a `date` as a `String` formatted YYYY-MM-DD, which correspond to the date the document was produced and an `url` as a String, which points to the associated, assets document path.

### Organization events

For the `Events` page, there is only an `Array` of events to be retrieved. Those returned events should be sorted by date, from most recent to older. Most recent can be in the futur, the frontend already handle such use case. These events should all be retrieved under the same API endpoint, probably a GET one, which might return an object that looks like `assets/json/data/events.json`.

- An `Event` object must contain a `title` as a `String`, a `catalog` as a `String`, an `image` as a `String` which points to the associated, asset image path, a `date` as a `String` formatted YYYY-MM-DD, a `place` as a `String`, an `url` as a `String`, a `description` object which contains the supported languages translations and a `starring` array, which contains object with `name` and `url`. Those artists can be outside of organization, it is not to be associated with a following `Artist` obkect.

  The event associated `image` is stored as `webp`, with a size of 1024 x 525.

### Selled merch

Before any shop subdomain come to life, the frontend need, with a single call, to retrieve all kinds of merch. For now, only two subkeys are required : `apparel` and `albums`. Both of them are array of objects. These merch ojects should all be retrieved under the same API endpoint, probably a GET one, which might return an object that looks like `assets/json/data/merch.json`.

- The `apparel` array must contain `Collection` objects, which defines a `name` as a `String`, a `designer` as a `String`, a `type` as a `String`, a `catalog` as a `String`, a `price` per unit as a `String` (postage fees excluded) and an `image` as a `String`, which points to the associated asset image path.

  The `Collection` associated `image` is stored as `webp` with a size of 500 x 349.

- The `albums` array must contain `CD` objects, which has a `name` as a `String` and that is a concatenation of `Artists - Album name`, a `catalog` as a `String`, an `image` as a `String` which points to the associated asset image path and a `price` object, which defines two different prices as `String` ; one for regular release, the other for signed ones. Those price doesn't include the postage fee.

  The `CD` associated `image` is stored as `webp`, with a size of 500 x 349, and should mock the CD artwork and disc.

### Organization creations

There is the big boi. To start on, only one API call should be performed to retrieve the four following subsections. Propable a GET one, which might return an object that looks like `assets/json/data/creation.json`.

#### Music

The `music` object contains an `artists` array of produced/signed `Artist`, and a `releases` objects, which reference all releases by their catalog value. The sorting of the artist array is the most delicate part of the modelisation. Indeed, the artists are sorted so that the first one is the one which released content the sooner from today. It means that each time an artist releases a single or an album, it will be placed first in this array. Release's date should be inspected in order to properly buld this ordered array. Ping @ArthurBeaulieu when you reach this point to discuss this out loud.

- The `artists` array contains `Artist` object, which must be composed of a `name` as a `String`, a `genres` array which contains `String`, an `image` as a `String` which points to the associated asset image path, a `releases` array which contains `String`, those strings must exaclty match the release's catalog number, a `links` array which contains `Link` objects and a `bio` object which contains as mush key as available languages.

  The `Artist` image is stored as `webp`, with a size of 910 x 512.

  The `Link` object is defined as an appendix for this `Creation` section

- The `releases` object contains `Release` objects, stored by their catalog number as key. They must contains a `name` as a `String`, an `artist` array of `String`, a release `date` as a `String` formatted YYYY-MM-DD, an `image` as a `String` which points to the associated asset image path, a `mainLink` as a `String` which is the primary link used in UI and a `links` array which contains `Link` objects.

  The `Release` image is stored as `webp`, with a size of 512 x 512.

  The `Link` object is defined as an appendix for this `Creation` section

#### Video

The `video` subkey must hold an array of `Video` objects. Those videos must be sorted by date, from most recent to the oldest.

- The `Video` object must contain a `name` as a `String`, an `artist` as a `String`, a `date` as a `String` formatted YYYY-MM-DD and a `url` as a `String`.

#### Photo

The `photo` subkey must contain an array `event` of `Photo` object, sorted as defined (in admin user, an order number should be customizable), and an `exposition` object.

- The `Photo` object must contain a `name` as a `String`, a `photographer` as a `String`, an `image` as a `String`, which points to the associated asset image path and a `url` as a `String`, pointing to the photographer reference link.

- The `exposition` object must contain two subkeys, an `artist` array of `Exposition` object and a `prices` object. The `Exposition` object should give a `title` as a `String`, a `photographer` as a `String`, an `url` as a `String` which points to the photographer prefered link, and an array of 5 `photos`, defining the exposition pictures. A `Photo` shoudl contain a `title` as a `String`, a `date` as a `String` formatted YYYY-MM-DD, a `margin` as a `String` and an `image` as a `String` which is pointing to the associated asset image path.

#### Software

The `software` subkey must hold two different objects ; a `creation` array and a `artists` array. Those array don't have specific order giudeline, but it could be nice to have a way to specify that order in the admin view.

- The `creation` array must contain `Website` objects that give a `name` as a `String`, an `image` as a `String`, which points to the associated asset image path, an `url` as a `String` and a `bio` object which contains as mush key as available languages.

  The `Website` image is stored as `webp`, with a size of 1920 x 1080

- The `artists` array must contain `Website` objects, identical to the ones defined for `creation`, except they don't have any `bio`.

  The `Website` image is stored as `webp`, with a size of 1920 x 1080

#### Appendix : supported `Link` object

When referencing a `Link` object means it must contain an `url` as a `String`, and a `type` as a string. The `type` must be one of the following :

amazon, apple, bandcamp, deezer, discogs, facebook, flickr, github, instagram, linkedin, mixcloud, soundcloud, spotoify, tidal, twitter and youtube.

## Notes on the above

The most important thing is that, on a first drop, the backend returns an equivalent of each of the four `.json` contained in the `json/data` subfolder. For everything that as to deal with the sorting and else, it could be handle on a second drop, as well as an admin panel making possible to edit each of these entries.
