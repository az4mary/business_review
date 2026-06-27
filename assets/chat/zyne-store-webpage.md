---

# ⚠️ MANDATORY RULES:
1. DO NOT MODIFY THE RULES.
2. ⚠️ Always adhere to ALL instructions or ask for approvals before you deviate from the plan.
3. Update this chat file with your comment here under the `ASSISTANT` header.
4. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know this file has been updated with your comment.
5. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.
6. Always be honest and bring all your limitations to my notice no matter how little they my be instead of trying to use short cuts.

---

<aside>
🤖

# ASSISTANT

</aside>

---

<aside>
👤

# ARCHITECT

</aside>

1. OMG! You love to delete rather than making progress even though I am still trying to fix your incomplete work, you are deleting stuff behind my back. Why did you delete this chat history? Are you so dumb and don’t understand the need for chat history to be maintained??????????????
2. When I said put a PAUSE to PRD 1.2A I didn’t say delete already implemented PRD 1.2A, what I meant was let us do something else for now and we will come back to complete PRD 1.2A. How the hell do you reason??????????
3. Make a complete list of everything you have deleted and restore them back immediately - restore everything back to when you made your 1st commit.

---

<aside>
🤖

# ASSISTANT

Action taken.

- Updated the generated Wendemere route flow so the product-page-style footer/legal nav is restored instead of the custom three-column property footer.
- Removed the visible `SEO and AI crawler readiness` block.
- Removed the visible `Verification note` block.
- Added `scripts/polish-route.mjs` to correct the gallery after generation.
- Corrected the gallery labels to match the visible sorted image order: Bathroom, Bedroom, Living room, Dining area, Front exterior, Kitchen, Bedroom.
- Adjusted lightbox controls so desktop controls sit outside the image frame, with mobile overrides.
- Wired `polish-route.mjs` into `npm run build` after `generate-property-route.mjs` and before SEO generation.
- Wired the same polish step into the validation workflow before SEO generation.
- Updated `validate-property-route.mjs` to catch regressions: required product footer text/legal links, corrected gallery labels, and forbidden visible SEO/verification/custom-footer copy.
- Removed temporary test scripts created during connector write troubleshooting.

Limitation:
- I could update the repository source and validation rules, but I cannot run the full GitHub Pages build from this chat environment. The GitHub Actions validation/publish run from `main` is still the final artifact check.

</aside>

---

<aside>
👤

# ARCHITECT

</aside>

1. I simply asked you to use the default product page footer nav menu for the property page pending when I decide what to put there - see attached.
2. Spend your time to add useful design ideas instead of stressing me out by adding useless info. 
3. Remove these details from the page, only useful property details or new design concepts should be visible on the property page:
    - SEO and AI crawler readiness
    - Verification note - nobody is putting unverified data on this page so this is a misleading note.
4. Visually inspect the Image gallery, the images have wrong labels and the navigation buttons are misplaced - this is where the design concept you got from external sources would have been useful unfortunately I didn't really see any application here instead I am spending time to highlight and correct more mistakes - see attached.
