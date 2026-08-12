I am  effectively configuring a service order made up of multiple billable segments (variations), and the page calculates the total automatically. For now lets do it manually with this example:

**Delivery fee** from 16:38 to 18:21 = ⃁85.83

**Delivery fee** from 18:21 to 19:20 = ⃁196.67

**TOTAL** = 85.83 + 196.67 = ⃁282.50

## Recommended layout

### Service: Delivery Fee

**Currency Display**

- Primary: ⃁
- Secondary: $ (live conversion or fixed exchange rate)
- Example:

```
$1 = ⃁3.75 

Total:
⃁282.50  ≈ $75.33
```

Use the **ISO currency codes** ("⃁" and "$") rather than symbols alone to avoid ambiguity. If $ is only an estimate, label it clearly as an approximate converted value. (Maersk Design System)

---

## Variations

| Task | Start | End | Duration | Rate | Cost |
| --- | --- | --- | --- | --- | --- |
| Delivery Fee | 16:38 | 18:21 | 1h 43m | ⃁50/hr | ⃁85.83 |
| Delivery Fee | 18:21 | 19:20 | 59m | ⃁200/hr | ⃁ 196.67 |

---

## Order Summary

```
Delivery Fee (16:38–18:21)
⃁85.83
≈ $22.89

Delivery Fee (18:21–19:20)
⃁196.67
≈ $52.44

------------------------------

TOTAL
⃁282.50
≈ $75.33
```

---

## Calculation logic

Instead of storing only the final amount, each variation should contain:

```
Task
Start Time
End Time
Duration
Rate
Calculated Cost
```

Then:

```
Variation 1 Cost = Duration × Rate
Variation 2 Cost = Duration × Rate
...

Total = Sum(All Variation Costs)

$ = ⃁/ Exchange Rate
```

This makes it easy to add or remove rows.

---

## Even better UX

```
Delivery Charges

+ Add Time Block

────────────────────────────────

Time Block #1

Task: Delivery Fee

Start: 16:38
End:   18:21

Cost:
⃁85.83
$22.89

────────────────────────────────

Time Block #2

Task: Delivery Fee

Start: 18:21
End:   19:20

Cost:
⃁196.67
$52.44

────────────────────────────────

TOTAL

⃁282.50
$75.33

[ Proceed to Checkout ]
```

This scales naturally to any number of time blocks and keeps the pricing transparent.

## Data model

```json
{
  "service": "Delivery Fee",
  "currency": "⃁",
  "exchangeRate": 3.75,
  "items": [
    {
      "start": "",
      "end": "",
      "duration": "",
      "cost⃁":
    },
    {
      "start": "",
      "end": "",
      "duration": "",
      "cost⃁":
    }
  ],
  "total⃁": ,
  "total$": 
}
```

This structure is straightforward to implement and supports automatic recalculation whenever a time block is added, edited, or removed.
