---
title: "Embedding Stripe Checkout in Webflow"
description: "How I upgraded my Buy Now buttons into Add to Cart buttons"
pubDate: "Sep 25 2025"
heroImage: "/blog/add-to-cart-announcement.png"
tags: ["Build In Public", "Services", "Revenue Streams"]
badge: "JustPolyThings"
---


# Embedding Stripe Checkout in Webflow

If you’d told me two years ago before starting [JustPolyThings.com](http://JustPolyThings.com) that I’d eventually want to add a shopping cart, I would have just started the site on Shopify or some other e-commerce platform. 

But I wanted to try content marketing, and I’d just fallen in love with Webflow. 

## My Use Case

Cut to today, where I have over 250 items in a Webflow collection called: Products. Products have dynamic button links. Some link to Amazon or other Partner sites, and some link to Stripe Payment Links. 

### Stripe Payment Links vs Stripe Checkout

For anyone not intimately familiar with Stripe’s products and API, they have two different options for checkout. A Stripe Payment Link is the simplest option, and what Products on my site have been using up until now. It provides a fully-hosted-by-stripe checkout experience with only a single link. Great for making drop-dead-simple BUY NOW buttons. 

After nailing down a few drop-shipping partners, I set out to replace my payment link BUY NOW buttons with a new ADD TO CART embedded Stripe checkout experience. 

Here’s how that went and how I achieved this goal…

*If you need help with a similar use case, consider hiring CoastWeb to upgrade your site’s user experience.*

## Step 1: Dynamic Buttons

I was already using Webflow’s “Conditional Visibility” to dynamically render different buttons on different products. For example, some buttons need to link to Amazon, but others need to link to an affiliate partner’s site, some products get both buttons, etc. 

I also needed a way for my Webflow CMS to link Products to specific product\_id’s and price\_id’s in Stripe. 

1. Add fields to Products collection in Webflow for Stripe Ids.
2. Use the “Is Set” option to only show the Add to Cart button on items that have a set of stripe ID’s.

This was the easiest part, just edit the collection in Webflow to add the id fields, and then a little bit of design work on the new “Add to Cart” button. ✅

## Step 2: A cart that remembers your order

After considering cookies, express middleware, and a whole bunch of other things, I settled on local storage for my “guest” carts. *(KISS- I’m only having “guest” carts for now, single device/browser and no login required for checkout.)*

In order for clicking on the Add to Cart button to do anything, I needed to add an event listener on the click event. Fortunately Webflow makes it super easy to add custom scripts to your page. 

I made it so that clicking the button creates a cart-data key in local storage with an array of objects. Each object is a line item with a “productId”, “qty”, and other details. 

## Step 3: View Cart & Checkout

Next was making the actual View Cart page where users can complete their checkout. I wanted to embed Stripes’s checkout page, not redirect users away from my site. This provides a hybrid experience where users never have to leave my site, but their CC information is also not entered into JustPolyThings, but instead directly onto Stripe’s page via an iframe. 

One challenge with this approach however is that webflow is essentially a SPA once published. There’s no where to hide your secret Stripe API key in Webflow. 

You need a script running somewhere that can 

* Know your secret Stripe API key
* Call Stripe to “Create a checkout session” (using the secret API key)
* Retrieve a checkout session from Stripe (using a session ID) so that you can display the checkout embed.

Fortunately Stripe has a Cloudflare worker template that does exactly this. I cloned that to a private repo, and updated it for my site. Once deployed to Cloudflare it gave me a `/session` endpoint that can create new Stripe checkout sessions, and retrieve them. Check it out at: [https://github.com/stripe-samples/stripe-node-cloudflare-worker-template](https://github.com/stripe-samples/stripe-node-cloudflare-worker-template)

I added a new page in Webflow, and on that page made a div where I want the Stripe Checkout form to appear. This div has an ID of “checkout” and a script on that page uses the data in local storage to POST to the `/session` endpoint. It gets back a session id for a checkout session that has been created by Stripe. 

Finally the View Cart page script uses my public Stripe key to load the session into the div called “checkout” using the session ID it got back from Cloudflare. 

This keeps my Stripe secret key off of my Webflow site entirely, while my Stripe shareable public key lives in the script on Webflow. 

## Step 4: Order Confirmation

The final step in this process is the “Success” or confirmation page. Following Stripe’s documentation I added another page to Webflow with a dynamic div. I also added a script to that page so that if you try to load it without a completed checkout session id you just get redirected back to the View Cart page. This means you can only be redirected to this page from Stripe with a valid completed checkout session. 

## One Final Gotcha

At this point I was super pleased with my very MVP Add to Cart buttons and Stripe checkout embeds, but I realized a pretty big “bug” in this user flow:

* I didn’t give the user a way to empty their cart, except by completing checkout.

*That’s fine though, right? LOL*

I considered two options. 

1. The better and more involved route: upgrade the “Add to Cart” button be smart enough to turn itself into a “Remove from Cart” button
2. The faster and easier: Drop an “Empty Cart” button on the page that lets users clear their carts and start over.

I went with option #2, and added the Empty Cart button. Remembering that this is version 0 of the “Checkout Experience” on this site, and that I can always upgrade the button logic later.

One step closer to drop shipping 🚀