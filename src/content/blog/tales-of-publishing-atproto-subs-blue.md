---
title: "Tales of Publishing on ATprotocol"
description: "An update on subs.blue and developing on the ATmosphere"
pubDate: "Aug 18 2025"
heroImage: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZpZm4yZnQ1cWhtcXp1MHRjd2tlNjgybXJkYmxpbHM4bWt4NDg5ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VGG8UY1nEl66Y/giphy.gif"
tags: ["Build In Public", "ATproto", "Publishing Tools"]
badge: "ATproto"
---

_**An update on subs.blue and developing on the ATmosphere**_

*Ok, but like WHY is the ATmosphere sooo cool?*

*…Because a PDS really is MY data.*

I wanted to write about MCP (Model Context Protocol), but do it “on the ATmosphere” using atproto publishing tools. Because I’m *that* kind of nerd. 🤓

## How It Started

So, I started a MCP “newsletter”. Only I never called it that. I keep wanting to call it a “series” because it’s supposed to grow to be more than *just* a newsletter. Leaflet calls them “pubs” or “publications” so let’s call it a “pub”. 

I set up a free account on Mailerlite, because sending email is practically illegal if you don’t do it through a service provider. Okay, I’m being hyperbolic here, but there are a ton of requirements and restrictions and I had no interest in rolling my own SMTP server to do the actual sending of the emails. 

Then, because I wanted to play with lexicons on atproto, I created [subs.blue](https://subs.blue). It’s an app that creates a “Subscribe” button that can feed someone’s atproto email address to my Mailerlite list. It also stores a ``subs.blue.subscriber`` record in their PDS. (See my [previous post about subs.blue](https://coastweb.dev/blog/what-is-subsblue/) for more details)

## How Its Going

After a few weeks of dropping new posts every other Friday, I’d created an annoying manual process: 

1. Write the text in Google Docs
2. Gather and generate images
3. Format and proof
4. Copy-paste the draft into Leaflet.pub
5. Copy-paste the draft *again* into Mailerlite & schedule sending
6. Wait for the day of “drop” then manually click PUBLISH in leaflet
7. Manually update this Astro blog to add an “embed” of the Leaflet.pub link on my site.

There are so many issues with this process, the least of which is that it’s way too technical for the average user. 

## A Sprout of Hope

Recently, [https://github.com/nulfrost/leaflet-loader-astro](https://github.com/nulfrost/leaflet-loader-astro) was released, which is an amazing tool that helped my process a lot! 

They created a leaflet loader in Typescript for Astro sites. Eliminating step 7 above, so that I no longer have to manually update my site. Now, Astro can automatically “pull” from Leaflet (really from my PDS) as soon as posts are published. 

### But. Here’s how I want this to work:

1. (same as above) Write the text in Google Docs
2. Gather and generate images
3. Format and proof
2. Copy-paste the draft into Leaflet.pub
1. Schedule “publish” (please, please, make this feature a priority @leaflet.pub) 

Then at the scheduled time when the leaflet post is add to my PDS:

1. subs.blue will see that my leaflet publication has made a new post, and push it to Mailerlite, sending it immediately to anyone who’s subscribed to a specific group. (This would let me have both subscribers that are on and off the ATmosphere).

But something has been holding me back from further development on [subs.blue](https://subs.blue)… 

### Here comes the CRUD

A CRUD issue for all atproto developers: storing data in the user’s PDS and then therefore updating that data can only happen inside of an oAuth session (unless you’re the PDS host). 

In order to handle the use case of an "unsubscribe" coming from the email side of things, Mailerlite needs to be able to send a request to [subs.blue](https://subs.blue) and have it remove the “subscribe” record. This means I need the protocol to support asynchronous updates outside of an oAuth session, that somehow don’t defeat the entire purpose of the protocol which is to make the user’s PDS “theirs”. 

I don’t want to be advocating for an oAuth scope that looks like “login for me and make changes while I’m not looking” because even if that was a thing, no one would/should feel comfortable granting that level of access to their PDS data. 

But legal compliance, like that there has to be a working Unsubscribe button on every email, is going to force some kind of update mechanism eventually. If not for emails, for something else. 

## 💡Proposed Solution?

So, I think atproto needs some kind of record-update-key-system (please tell me this already exists, and I just couldn’t find it!) for lexicons and PDS’s. 

1. When an appView with PDS write access (oAuth scope) creates a record in a PDS it should be able to sign it with some kind of “write key” that will restrict updating the record unless that key is provided.
2. After creation, it can only be updated or deleted if the key is verified.
3. But also, anyone with the key can update it or delete it outside of an oAuth session. Then as long as the app secures the key, it’s the only one who can update that record.

I think this could accomplish a lot, such as preventing users from borking or corrupting data in their PDSs. Maybe PDS hosts could choose to support or not support this update mechanism?

If the PDS is supposed to be the “source of truth” for all ATmosphere apps to reference, how do we update it outside of an auth session? It feels like a basic CRUD problem. 

## Visions for the future of subs.blue

1. Leaflet.pub and a bunch of other “publishing lexicons” or “pubs” are supported as `subs.blue.channel` types.
2. Mailerlite and a bunch of other email (and other notification type) providers are supported.
3. Users with a “pub” and a distribution list sign up on [subs.blue](https://subs.blue) to syndicate their content from the protocol to their lists.

Want to comment? Find me on Bluesky [@immber.bsky.social](https://bsky.app/profile/did:plc:iinae3zb33z4263joxrnza74)