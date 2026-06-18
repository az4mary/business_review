# Universal Work Protocols

Last updated: 2026-06-18

## Purpose

This document preserves reusable operating protocols for future chats and
projects. It contains no client-specific, product-specific, report-specific, or
conversation-specific status information.

Each protocol has a stable ID so companion documents can later record exact
implementation steps, commands, code patterns, browser controls, verification
methods, and recovery procedures.

## 1. Instruction Control

### P-001 - Read the complete instruction scope

Read every requested instruction in sequence. Do not substitute searches,
snippets, sampling, or summaries for a complete reading.

When approval is required before execution:

1. Complete the reading.
2. Confirm that the full scope was read.
3. Wait for approval.
4. Begin only after approval is received.

### P-002 - Treat the newest instruction as controlling

Apply the user's newest clarification when it changes an earlier instruction.
Preserve all earlier requirements that do not conflict with it.

### P-003 - Do not selectively follow requirements

Do not choose which explicit requirements to follow. Do not silently omit,
reinterpret, or replace a requirement because another approach appears faster.

### P-004 - Do not assume missing facts

Inspect available files, browser state, project documentation, and existing
patterns before making a decision. Ask only when a material decision cannot be
resolved safely from available evidence.

### P-005 - Separate facts from assumptions

Label work accurately:

- `CONFIRMED`: supported by direct inspection or durable evidence.
- `REPORTED`: previously stated but not independently reverified.
- `IN PROGRESS`: started but not fully verified.
- `PAUSED`: intentionally stopped at a recorded checkpoint.
- `BLOCKED`: cannot proceed without a required input or external change.
- `ABORTED`: stopped by instruction.
- `SUPERSEDED`: replaced by a later instruction.

Never report an assumption as a confirmed result.

## 2. Professional Quality

### P-006 - Treat all deliverables as production work

Assume that websites, listings, reports, downloadable files, images, and live
administrative changes will be used by real clients unless explicitly told
otherwise.

### P-007 - Use intentional content and assets

Do not use random placeholder images, irrelevant copy, invented data, stale
dates, or generic assets in a professional deliverable. Every asset must support
the subject, audience, value, and visual standard of the work.

### P-008 - Match the established source of truth

When a reference page, listing, template, mockup, brand system, or existing
product is designated as the standard, use it as the source of truth for:

- Structure
- Writing depth
- Visual quality
- Typography
- Spacing
- Colors
- Image treatment
- Pricing presentation
- Controls
- Calls to action
- Responsive behavior

### P-009 - Preserve consistency across related items

Compare every item in a collection against the approved reference. Shared fields,
layout rules, image treatments, and interaction patterns must remain consistent.

### P-010 - Review the complete deliverable

Do not rely on spot checks when the user requests a complete review. Inspect every
page, item, state, and output included in the defined scope.

## 3. User Communication and Steering

### P-011 - Keep the steering channel responsive

Remain responsive while actively working so the user can redirect, correct, or
pause the workflow.

### P-012 - Obey pause and abort instructions immediately

When told to pause, stop taking new actions. When told to abort, preserve the
current state and discontinue the workflow.

### P-013 - Report progress factually

State what has been completed, what is being checked, and what remains. Do not
claim completion while verification, publishing, deployment, or output parity is
still pending.

### P-014 - Use conservative checkpoints

Record only the last fully completed and verified unit. An opened page, generated
file, attempted edit, or partial upload does not count as complete.

### P-015 - Preserve durable project memory

Record reusable protocols, accepted decisions, checkpoints, mappings, and
recovery procedures in project files so they survive context compaction and can
be used by future chats.

## 4. Browser Operations

### P-016 - Use the designated browser session

When instructed to use an already-open browser, connect to that exact session and
reuse its authenticated state. Do not create a separate session unless required.

### P-017 - Keep the browser tab count low

Use one or two tabs when practical. Reuse, refresh, and navigate existing tabs to
avoid performance degradation and confusion.

### P-018 - Allow slow interfaces to finish

Wait for the page, modal, upload, publish operation, or navigation to settle.
Avoid duplicate clicks while the interface is still processing.

### P-019 - Recover unstable browser flows consistently

When an administrative flow fails:

1. Capture the current state if useful.
2. Refresh the entire page.
3. Wait for the page to finish loading.
4. Return to the required section.
5. Repeat the same approved workflow.
6. Verify the saved state before continuing.

Do not invent a different workflow unless the approved flow is genuinely
unavailable.

### P-020 - Use screenshots as verification evidence

Capture and inspect screenshots whenever visual state cannot be confidently
determined through structure or text inspection alone.

Typical screenshot checkpoints include:

- Image crop modals
- Responsive layouts
- Print previews
- Upload previews
- Post-publish states
- Overlapping elements
- Truncated text
- Modal controls
- Canvas or image-based interfaces

Screenshots are verification aids, not deliverables unless requested.

### P-021 - Verify the result after every material action

After uploading, saving, publishing, deleting, moving, or editing an item, inspect
the resulting state before advancing to the next item.

## 5. Image Upload and Cropping

### P-022 - Confirm required image dimensions

Record the platform's required pixel dimensions, aspect ratio, file type, and
size limit for every image slot before preparing assets.

### P-023 - Identify the retained crop area

In a crop interface, determine which visible rectangle represents the retained
image. Judge the final composition only by what will remain inside that area.

### P-024 - Use zoom and pan deliberately

Use zoom-out, zoom-in, and drag controls to:

- Keep important content inside the retained area.
- Avoid cutting off logos, faces, text, or product details.
- Produce balanced margins.
- Preserve the intended focal point.

### P-025 - Account for interface overlays

Leave visual space where the platform automatically adds titles, prices, badges,
buttons, or navigation controls. Do not place essential artwork beneath an
overlay region.

### P-026 - Verify responsive crops

Inspect the saved image at every relevant responsive size. A desktop crop may not
be acceptable on mobile.

### P-027 - Complete the image save sequence

After positioning an image:

1. Confirm the retained crop visually.
2. Select the interface control that accepts the crop.
3. Save or publish the parent item.
4. Wait for completion.
5. Reopen or preview the saved item.
6. Verify the final image at required viewport sizes.

## 6. Product and Listing Administration

### P-028 - Define a listing source of truth

Select an approved listing as the reference for all related listings. Document
which elements must match and which fields are product-specific.

### P-029 - Validate every listing field

For each listing, inspect:

- Product name
- Price
- Short and long descriptions
- Thumbnail
- Checkout image
- Included items
- Options
- Reviews or testimonials
- Calls to action
- Delivery details
- Publish state
- Desktop presentation
- Mobile presentation

### P-030 - Use appropriate product imagery

The imagery must communicate the product category, quality, and price position.
High-value products require intentional, premium, relevant visual assets.

### P-031 - Publish before marking complete

An edit is not complete until the publish/save action succeeds and the public or
saved result has been inspected.

### P-032 - Verify bulk edits individually

Bulk editing may improve efficiency, but it does not replace individual
verification. Inspect every affected item after the bulk operation.

### P-033 - Complete one item before advancing

When accuracy is critical, finish the current item through publish and
verification before starting the next item.

## 7. Website Implementation

### P-034 - Match the established visual language

New pages must follow the existing site's typography, color system, spacing,
navigation, controls, responsive behavior, and tone.

### P-035 - Place logos with visual hierarchy

Use client and brand logos at sizes and locations appropriate to their role.
Avoid duplication, weak visibility, content obstruction, and disproportionate
scale.

### P-036 - Prevent control/content overlap

Toolbars, sticky controls, navigation panels, and floating elements must not
cover titles, body text, buttons, or interactive content at any supported
viewport.

### P-037 - Validate text encoding

Inspect all visible labels and downloadable text for malformed characters,
mojibake, missing glyphs, incorrect symbols, and language encoding failures.

### P-038 - Validate dates and version information

Use the correct effective date, publication date, update date, and version.
Avoid hard-coded stale dates when current data is required.

### P-039 - Verify every call to action

For each call to action:

1. Confirm the label.
2. Confirm the destination.
3. Confirm the destination loads.
4. Confirm behavior on desktop.
5. Confirm behavior on mobile.
6. Confirm download or print behavior when applicable.

## 8. Responsive and Live-Site Validation

### P-040 - Check desktop and mobile

Every affected page or listing must be checked at desktop and mobile sizes.

### P-041 - Validate text containment

Confirm that headings, labels, buttons, tables, and body copy:

- Fit their containers.
- Do not overlap adjacent elements.
- Do not clip.
- Do not overflow horizontally.
- Remain readable at all target sizes.

### P-042 - Verify the live deployment

Local inspection is not final verification. After approved changes are committed
and pushed:

1. Wait for deployment.
2. Open the live URL.
3. Refresh without relying on stale cache when necessary.
4. Inspect desktop.
5. Inspect mobile.
6. Exercise the affected interactions.
7. Capture screenshots where visual evidence is useful.

### P-043 - Keep local and live states distinct

Clearly state whether a result was verified locally, in a generated artifact, in
the administrative interface, or on the live public site.

## 9. Print and PDF Output

### P-044 - Preserve physical printing

A print control must open a native print workflow when physical printing is part
of the requirement. Do not replace printing with a link that merely opens a PDF.

### P-045 - Synchronize print and downloadable PDF output

When both print and download controls exist, they must produce equivalent
professional content, branding, page order, pagination, and layout.

### P-046 - Use approved templates correctly

Use completed templates as layout references and designated blank templates as
the actual content backgrounds when instructed.

### P-047 - Start major sections on new pages

Each designated major section must begin on its own page. Define section breaks
explicitly in print styling or document generation.

### P-048 - Protect content continuity

Prevent avoidable splits involving:

- Headings and their first paragraph
- Paragraphs
- Bullet items
- Numbered items
- Nested lists
- Table rows
- Captions
- Callout boxes
- Signatures
- Section introductions

Move the complete unit to the next page when it cannot fit cleanly.

### P-049 - Use professional tables

Tables must provide:

- Strong header/body contrast
- Readable text over backgrounds or watermarks
- Consistent borders
- Clear row separation
- Appropriate cell padding
- Stable column widths
- Repeating headers when required
- No stray wrapper backgrounds or artifacts

### P-050 - Inspect every rendered page individually

Review the rendered document one page at a time, at full resolution, in strict
numerical order. Do not substitute contact sheets, sampling, thumbnail scans, or
text extraction for visual page-level inspection.

For every page, inspect:

- Typography
- Alignment
- Clipping
- Overflow
- Heading continuity
- Paragraph continuity
- List continuity
- Tables
- Header and footer
- Page number and total
- Background or watermark
- Visual balance
- Empty or nearly empty pages
- Unexpected section breaks

### P-051 - Regenerate after print changes

Any change that can affect layout requires a new render. Do not rely on a PDF or
page image generated before the latest change.

### P-052 - Verify PDF parity

Before delivery:

1. Generate the accepted print output.
2. Update the downloadable PDF from that accepted output.
3. Compare page count.
4. Compare page dimensions.
5. Compare content order.
6. Compare representative and risk-prone pages.
7. Verify both user-facing controls.

## 10. File and Output Validation

### P-053 - Inspect every requested output format

When a project includes PDF, Word, Markdown, spreadsheet, image, or other
downloadable formats, inspect each required format independently.

### P-054 - Validate presentation, not only file existence

A file's existence does not prove quality. Open or render it and inspect layout,
content, branding, fonts, images, pagination, and usability.

### P-055 - Keep source and generated artifacts identifiable

Separate editable source files, final deliverables, and temporary QA artifacts.
Do not accidentally publish temporary screenshots or review files.

### P-056 - Maintain output parity

Equivalent formats should contain the same approved content unless a documented
format-specific difference is intentional.

## 11. Git and Deployment

### P-057 - Inspect the working tree before editing

Identify existing modified and untracked files. Preserve unrelated user changes
and avoid reverting work that is outside the current task.

### P-058 - Commit only intended changes

Review the diff before committing. Exclude temporary QA files, unrelated edits,
credentials, and local-only artifacts.

### P-059 - Use meaningful commit messages

Describe the completed outcome clearly enough that future reviewers can identify
the purpose of the change.

### P-060 - Push before live verification

When the live site deploys from the repository, push the approved commit and wait
for deployment before evaluating the public result.

### P-061 - Do not confuse committed and uncommitted work

Record which changes are committed, pushed, deployed, or still local. Do not
claim that local edits are live.

## 12. Time-Boxed Work and Heartbeats

### P-062 - Respect the work-block limit

When a maximum work period is defined, treat it as a hard limit.

### P-063 - Use a pre-stop warning

Schedule a warning before the hard stop. At the warning:

- Do not start a new unit of work.
- Do not start a new fix.
- Do not start a new test.
- Do not start a commit or deployment.
- Finish only the currently open unit if it can be completed safely.
- Save existing edits.
- Record the exact checkpoint.

### P-064 - Stop at the hard boundary

At the hard stop, cease work even if the full task remains incomplete. Preserve
the next resume point instead of rushing.

### P-065 - Honor the offline break

Perform no task work during a required offline interval. Resume only when the
scheduled wake-up occurs.

### P-066 - Keep automation state accurate

Update the reminder or heartbeat so it always reflects the true state:

- Active work
- Pre-stop warning
- Offline break
- Resume checkpoint
- Completed or obsolete automation

### P-067 - Never trade quality for deadline appearance

Do not reduce verification depth, skip requirements, or claim completion to fit
within a work block. Stop and continue later.

## 13. Failure Recovery

### P-068 - Diagnose before repeating destructive actions

When a save, upload, publish, crop, deployment, or render behaves unexpectedly,
inspect the current state before repeating an action that could overwrite valid
work.

### P-069 - Restore original assets when requested

If an edited or cropped asset is rejected, restore the designated original asset
before attempting a corrected transformation.

### P-070 - Reverify after recovery

After correcting a failed workflow, repeat all verification steps that could have
been affected. Do not assume the recovery preserved prior settings.

### P-071 - Preserve a resume checkpoint

When interrupted, record:

- Last fully completed unit
- Current partially completed unit
- Next unchecked unit
- Files with unsaved or uncommitted changes
- Required next action
- Verification still pending

## 14. Completion Gate

### P-072 - Apply a final acceptance checklist

Do not report final completion until all applicable checks pass:

- Full instruction scope completed
- All requested items implemented
- Desktop verified
- Mobile verified
- Images and crops verified
- Text and encoding verified
- Dates and versions verified
- Calls to action verified
- Print behavior verified
- Downloadable files opened and inspected
- Page-by-page QA completed when required
- Saved or published states verified
- Intended changes committed
- Changes pushed
- Live deployment verified
- No unresolved defects remain

### P-073 - Report residual risk honestly

If any check could not be performed, state exactly what remains unverified and why.
Do not use a broad completion statement that conceals a verification gap.

## 15. Companion Procedure Documentation

For any protocol that requires repeatable technical execution, create a companion
procedure using the same protocol ID and include:

- Purpose
- Preconditions
- Required access
- Inputs
- Exact file paths
- Exact URLs
- Exact commands or code
- Exact browser sequence
- Expected intermediate states
- Screenshot checkpoints
- Verification checks
- Failure recovery
- Rollback procedure
- Completion criteria

