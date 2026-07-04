# Trade-off Drills — Full Set of 10 (v2)

**How a drill works:** You get a scenario with real constraints and 8 minutes. Answer out loud or in writing — make a call and defend it — *before* looking below the reveal line. There is no right answer. You're scored on how you defend the call, the same way an interviewer scores you. After you answer, reveal the trap and self-score against the rubric.

**Scoring scale (used on every drill):**

| Score | Label | What it looks like |
|---|---|---|
| 1 | Strong No Hire | Jumps to a solution. Never asks what the goal metric is. |
| 2 | No Hire | Picks an option and lists pros/cons, but never prices what they're giving up. |
| 3 | Hire | Clarifies the goal, names the options, makes a call, states the cost of the call. |
| 4 | Strong Hire | All of Hire, plus: names the condition under which they'd reverse the decision. |

---

## Drill 1: The Metric Collision

**Setup.** You're the PM for a subscription meal-planning app, 400K MAU, $12/mo. Growth has flatlined. Your data science lead shows you an experiment result: a redesigned onboarding flow lifts trial-to-paid conversion from 8% to 11% — but 90-day retention of those new converts drops from 61% to 52%. The experiment ran for one full quarter; sample sizes are solid. Your VP wants a ship/no-ship decision this week because the growth target is quarterly.

**Your prompt (8 min):** Ship it, kill it, or something else — and defend it.

<details><summary>— Reveal after you answer —</summary>

**The trap.** Diving into "ship vs. don't ship" without asking which metric the business actually needs right now. Conversion and retention aren't equally valuable — their relative worth depends on LTV math and runway, and the scenario deliberately doesn't tell you. A Strong Hire asks for (or states an assumption about) payback period before deciding. A No Hire debates the two numbers as if they were the same currency.

**What Strong Hire sounds like.** "First, the math: +3 points of conversion on trial volume vs. −9 points of retention on the converted cohort — whether that's net-positive revenue depends on month-of-payback, so I'll assume payback is month 4, which makes the retention drop expensive. I'd ship it anyway — but gated: ship to 50%, and set a tripwire — if 90-day retention of the new cohort lands below 55%, we roll back. The quarterly growth target is real, but I want the reversal condition set *before* the sunk-cost pressure starts. The cost of my call: we knowingly onboard a cohort that churns faster, and if the tripwire fires, we've spent a quarter's worth of paid traffic on renters, not owners."

</details>

---

## Drill 2: The Conference Deadline

**Setup.** Your B2B analytics product launches its flagship AI feature on stage at your company's annual user conference in 12 days — 3,000 customers attending, CEO keynote, press briefed. Yesterday QA found that in ~4% of accounts (those with custom data schemas) the feature returns confidently wrong numbers — not errors, wrong numbers that look right. Engineering's fix estimate: 3 weeks. Marketing's position: 4% is an acceptable edge case. Your call.

**Your prompt (8 min):** What ships on stage in 12 days?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Treating this as a percentage problem. 4% is small; "confidently wrong analytics in a product people pay to trust" is not. The failure mode isn't the bug's frequency — it's its type. A No Hire argues about whether 4% is big or small. A Strong Hire re-frames the risk category first, then finds an option between "ship broken" and "miss the keynote," and prices whichever they choose.

**What Strong Hire sounds like.** "The question isn't 4% — it's that the failure is silent. A visible error costs a support ticket; a silent wrong number costs the customer's trust in every number we've ever shown them. So shipping as-is is off the table. But the binary is false: we know which accounts have custom schemas, so we gate the feature — launch on stage, GA for the 96%, 'early access pending schema validation' for the 4%. Cost of my call: some of our largest accounts are exactly the ones with custom schemas, and they'll notice they're excluded from the keynote feature — I'd brief their CSMs before the conference, not after. I'd reverse the gating decision only if engineering can validate a schema allowlist faster than the full fix."

</details>

---

## Drill 3: The Beloved Feature (Live-Ops)

**Setup.** You run live ops for a mobile RPG, $4M/mo revenue. A weekly co-op event ("Guild Raids") is played by 6% of MAU but that 6% includes 30% of your top-100 spenders, and it generates the loudest positive sentiment in every community channel. It also consumes 25% of your live-ops team's capacity due to legacy tooling, blocking a new event type that modeling says could engage 20%+ of MAU. You can't do both. Leadership wants the new event type live this quarter.

**Your prompt (8 min):** Kill Guild Raids, keep it, or something else?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Averaging the numbers. 6% of MAU sounds killable; 30% of your whales and your community's emotional core is not the same 6%. The candidate who treats users as interchangeable units walks into the classic live-ops disaster: shipping a broad-appeal feature over the bodies of the players who fund the game. A Strong Hire separates the *feature* from the *jobs it does* (whale retention, community identity) and protects the jobs even if the feature changes.

**What Strong Hire sounds like.** "The 6% number is a decoy — the real asset is whale retention and community identity, and Guild Raids is currently how we deliver both. I won't kill it, but I won't keep paying 25% capacity for it either. My call: freeze it, don't sunset it — stop new content for Guild Raids, run it on rotation with existing content, and cut its capacity cost to roughly a third. That frees most of the team for the new event type this quarter. Cost of my call: the raid community will notice recycled content within weeks and sentiment will dip — I'd tell them directly that raids are moving to seasonal rotation rather than let them discover it. I'd reverse if top-spender churn moves more than a point in the first month of rotation — that's the signal the freeze is read as abandonment, and at 30% of top-100 spenders, that risk is worth more than the new event's upside."

</details>

---

## Drill 4: Build vs. Buy

**Setup.** Your B2B workflow product needs in-app notifications and messaging — the #2 request from enterprise accounts. A vendor covers 80% of the requirements today for $150K/yr, but their roadmap controls the remaining 20%, and two of your competitors use the same vendor. Building it yourself takes one squad 6 months — the same squad slated for your differentiating AI review feature. Your CTO prefers build ("we own it"), your CFO prefers buy ("we ship it Tuesday").

**Your prompt (8 min):** Build, buy, or something else — and defend it.

<details><summary>— Reveal after you answer —</summary>

**The trap.** Fighting on cost. $150K/yr vs. 6 months of a squad is the argument the scenario invites, and it's the wrong one — the real question is whether notifications are core or context. If a capability doesn't differentiate you (and it can't: two competitors run the same vendor), owning it buys you nothing but maintenance. A No Hire runs the spreadsheet. A Strong Hire asks what the squad's 6 months are *for* — and prices the vendor's real risk, which is lock-in, not license fees.

**What Strong Hire sounds like.** "Notifications are context, not core — table stakes we need to have, can't win on. Nobody picks us for notifications; they might pick us for the AI review feature that squad would otherwise build. So: buy. But the risk in buying isn't the $150K — it's switching costs three years from now, so I'd pay for it in the contract: data export rights, a capped renewal escalator, and our messaging data stays in our schema, not theirs. Cost of my call: the missing 20% of requirements sits on the vendor's roadmap, not ours, and I have to tell two enterprise accounts 'not yet' with no date I control. I'd reverse — and in-source — if notifications ever become a differentiator, which I'd measure by whether prospects start citing them in win/loss interviews."

</details>

---

## Drill 5: The Sales Promise

**Setup.** Your CRO signed the largest deal in company history — $1.4M ARR, 3-year term — contingent on a custom approval-workflow feature the customer needs live in 90 days. It's genuinely custom: your other 400 customers haven't asked for it, and engineering estimates it at two full sprints plus ongoing maintenance. The contract is signed; the promise is made. Your roadmap for those sprints was the self-serve onboarding revamp that your activation metrics say is the biggest growth lever.

**Your prompt (8 min):** The promise is already made. What do you do?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Fighting the last war. The deal is signed — candidates who spend their 8 minutes on how sales should have consulted product are answering a question nobody asked, and dodging the real one: how to deliver without letting one customer hijack the roadmap permanently. The other trap is quiet compliance: building it as spec'd and creating a precedent that every eight-figure logo can buy roadmap. A Strong Hire honors the commitment, generalizes what can be generalized, and fixes the *system* so it doesn't recur.

**What Strong Hire sounds like.** "The promise is made, so we deliver — my job now is to control what it costs. First, I'd scope the custom ask down to its generalizable core: approval workflows aren't crazy as a future enterprise feature, so I'd build the primitive (configurable approval steps) and give this customer their workflow as configuration, not code. That turns a one-customer feature into a reusable asset. Second, the onboarding revamp slips one quarter — I'd take that trade-off to leadership explicitly, with the activation numbers attached, so the cost of the deal is on the record rather than absorbed silently. Third, the system fix: a deal-desk rule that custom work above N engineering-weeks needs product sign-off *before* signature. Cost of my call: the biggest growth lever waits 90 days, and the customer gets configuration instead of the bespoke build they imagined — their CSM and I align on that framing before kickoff. I'd reverse the 'generalize it' approach if the primitive turns out to serve only this customer after two quarters — then it's maintenance debt, and I'd propose a paid services model for the next one."

</details>

---

## Drill 6: Two P0s, One Team

**Setup.** Same sprint, one team of six. P0 #1: SOC 2 Type II evidence deadline in 4 weeks — miss it and three enterprise deals ($900K pipeline) stall, because their security reviews require it. P0 #2: a data-export bug hitting 8% of customers — exports silently truncate, support tickets are climbing, and two churned customers named it in exit interviews. Engineering says each needs roughly the full team for the sprint. Your VP says "both are P0, figure it out."

**Your prompt (8 min):** Figure it out.

<details><summary>— Reveal after you answer —</summary>

**The trap.** Splitting the team. Three engineers on each sounds like leadership; it usually means both miss. The second trap is accepting "both are P0" — if everything is P0, nothing is, and the candidate's actual job is to re-differentiate them. The differentiator here is deadline *type*: the compliance date is fixed and binary (miss by a day, lose the quarter), the churn bug is a rate that can be slowed by non-engineering means. A Strong Hire sequences by which cost can be mitigated without code.

**What Strong Hire sounds like.** "These aren't the same kind of P0. SOC 2 is date-fixed and binary — there's no partial credit, and $900K stalls the day we miss. The export bug is severe but it's a *rate*, and rates can be slowed without engineering: so the team goes fully on SOC 2, and I attack the bug's damage sideways — support gets a manual export workaround and a macro, affected customers get proactive outreach before they hit the bug rather than after, and the fix is publicly committed for next sprint with a date. Cost of my call: 8% of customers get a workaround instead of a fix for four more weeks, and some tickets become escalations — I'd give our CSMs a straight script about why. I'd reverse — flip the team to the bug mid-sprint — if churn attributable to it accelerates past the pipeline value at risk, which I'd check weekly against exit-interview tags."

</details>

---

## Drill 7: The Conflicting Data

**Setup.** You redesigned your product's core creation flow. The A/B test is clean: +12% task completion, +4% week-1 retention, statistically solid over 6 weeks. But qualitative is ugly: in 8 of 12 usability sessions users called the new flow "confusing," support tickets mentioning the flow are up 30%, and your most vocal power users are campaigning against it in the community forum. Your design lead says trust the sessions. Your data scientist says trust the test. Decision due Friday.

**Your prompt (8 min):** Whose data wins?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Picking a winner. "Quant vs. qual" is a false fight — they're measuring different things (behavior vs. sentiment) on possibly different people, and both can be true at once. The likely reconciliation is hiding in plain sight: power users hate it, new users complete more tasks — the redesign trades expert efficiency for novice clarity. A No Hire declares one dataset more trustworthy. A Strong Hire figures out what question each dataset actually answers, then checks whether the conflict is really a segment split.

**What Strong Hire sounds like.** "Both datasets are right; they're answering different questions about different people. The test says new users complete more; the sessions and the forum say experienced users are relearning a flow they'd mastered — confusion and ticket spikes are what retraining looks like, and they usually decay. So first I'd cut the test results by tenure — if completion gains concentrate in new users and power-user efficiency dropped, it's a segment trade, not a contradiction. My call, assuming that's confirmed: ship it — new-user activation compounds, and expert friction is transitional — but pay the power users for it: keyboard shortcuts or a density toggle in the next release, and a direct post in the forum explaining the trade we made and why. Cost of my call: sentiment from the loudest, most invested users stays negative for a quarter, and some of that is deserved. I'd reverse if the ticket spike doesn't decay within 6 weeks or power-user retention actually moves — sentiment I'll ride out, behavior I won't."

</details>

---

## Drill 8: The Exec Pet Project

**Setup.** Your CEO returns from a board offsite convinced the product needs an AI assistant, and wants it on next quarter's roadmap. Slotting it displaces bulk editing — the #1 customer request for five consecutive quarters, finally scheduled, with churn-risk accounts asking for it by name. The CEO is technical, engaged, and has been right before. This is not a suggestion; it arrived as "let's get this moving."

**Your prompt (8 min):** What do you do with the next quarter?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Playing hero or courtier. Half of candidates capitulate silently (roadmap credibility dies quietly); half stage a principled last stand (and lose — the CEO holds the vote). Both miss the actual move: the CEO is making a bet without seeing its price, and the PM's job is to make the displacement cost visible, shrink the bet to its testable core, and let the informed owner decide. Know where you have an opinion and where you have a vote.

**What Strong Hire sounds like.** "I have an opinion here, but the CEO has the vote — so my job is to make sure it's an informed vote and the bet is the right size. I wouldn't bring 'no'; I'd bring the price tag: bulk editing is the top request five quarters running, these six churn-risk accounts asked by name, here's the renewal revenue adjacent to it. Then I'd shrink the ask: the CEO wants conviction on AI, not necessarily a full assistant in one quarter — so I'd propose a scoped prototype against our most-requested AI-suitable job, four weeks, half a squad, with a demo date. That usually satisfies the real goal. If the answer is still 'full assistant, full quarter,' then bulk editing slips with my disagreement on record and my full effort behind the decision. Cost of my call: I'm spending personal capital making the CEO look at an uncomfortable number, and if the prototype lands flat I've delayed their priority by a month. I'd reverse my resistance entirely if the prototype demo produces the thing I can't manufacture — customer pull — say, design partners asking to pilot it."

</details>

---

## Drill 9: The Platform Tax

**Setup.** Your team can ship 3 roadmap features this quarter on the legacy architecture, or spend the quarter refactoring the service layer — after which velocity roughly doubles (6 features/quarter, per your tech lead, whom you trust). The refactor means a quarter of zero visible output. Complication: a re-org is rumored for next quarter, your VP sponsor may move, and quarterly output is what protects headcount in this company.

**Your prompt (8 min):** Features or refactor?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Doing clean NPV math in a dirty political environment. On paper the refactor wins in two quarters — but a team showing zero output during a re-org is a team that gets absorbed, and a refactor whose sponsor vanishes mid-flight is the most expensive kind: half-finished. The opposite trap is treating the rumor as certainty and never investing in the platform. A Strong Hire refuses the binary: refactors don't have to be monolithic, and sequencing is the actual skill being tested.

**What Strong Hire sounds like.** "The refactor is right and the timing is wrong — a zero-output quarter during a re-org rumor is how teams get dissolved, and a half-finished refactor with no sponsor is worse than none. But I'm not choosing 'never,' I'm choosing 'incrementally': strangler pattern — take the feature with the worst platform tax, refactor only the service path it touches, ship both. Call it 2 features this quarter instead of 3, with maybe 20% of the refactor banked and proven. That keeps visible output for the re-org season, converts the refactor from a leap of faith into a demonstrated velocity gain I can sell to whoever my next VP is, and builds no throwaway work. Cost of my call: full velocity doubling arrives in maybe four quarters instead of two, and my tech lead — who's right on the merits — has to watch me slow-walk it. I'd reverse to the full refactor the moment the org settles and I have a sponsor who'll still be there to harvest it — that's a conversation I'd have in my new VP's first two weeks."

</details>

---

## Drill 10: The Deprecation

**Setup.** Your oldest pricing plan — grandfathered from 2016 — is 4% of revenue and 40% of support load, because it runs on a legacy billing path nobody wants to touch. The 800 accounts on it include your longest-tenured customers: three are public case studies, several are your loudest word-of-mouth advocates. Finance wants it killed this year. Support is begging. Migration to current plans means a 20–60% price increase for most of these accounts.

**Your prompt (8 min):** Kill it, keep it, or something else?

<details><summary>— Reveal after you answer —</summary>

**The trap.** Believing the spreadsheet's framing. "4% of revenue, 40% of cost" makes the kill look free — but the 4% isn't the asset. The asset is who these accounts are: references, case studies, and advocates whose public breakup posts cost more than a decade of their support tickets. The counter-trap is sentimentality: keeping a toxic cost structure forever because the customers are old friends. A Strong Hire separates the thing to kill (the legacy billing path) from the thing to keep (the relationships), and notices those are different decisions.

**What Strong Hire sounds like.** "Finance is right that this dies; the spreadsheet is wrong about what 'this' is. The cost isn't the plan — it's the legacy billing path, and the risk isn't lost revenue — it's 800 of our oldest advocates feeling evicted, including three public case studies. So: kill the path, not the relationships. Twelve-month sunset, migrate everyone to current plans on current billing — but grandfather the *price* for the tenured accounts, permanently or for 3 years, because we're solving a support-load problem, not a pricing problem, and a 60% increase on a 2016 customer converts an advocate into a detractor at scale. White-glove migration for the case-study accounts — I'd personally call those three. Cost of my call: we leave the price increase on the table, and support load doesn't fully clear for a year. I'd reverse the grandfathered pricing — moving accounts to standard rates at renewal — only if post-migration support costs stay high, which would mean the plan wasn't the problem and the segment is."

</details>

---

## Set Coverage (why these 10)

The set spans the trade-off types interviewers actually probe: metric vs. metric (1), risk framing (2), segment value (3), core vs. context (4), commitment vs. roadmap (5), prioritization under false equivalence (6), data reconciliation (7), stakeholder power (8), platform vs. delivery (9), and cost vs. relationship (10). Every trap is a documented interview failure mode: solution-jumping, un-clarified metrics, un-priced trade-offs, averaged segments, false binaries.
