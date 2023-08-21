### Lessons in color-mapping:



- Using cumulative distributions to inform color-mapping 
  - This can help decide where a good color threshold to set as the max (or min) of your data, as outliers can leave a vast vacancy in your visual palette (many unused colors)
  - I find it moderately helpful for deciding whether to log the quantitative axis (or remain linear) before assigning a palette. If the distribution looks well-balanced in scale, 
    - is it the case that heavier tails call for logging?
  - In general, this approach is more concrete when explaining why I made the series of decisions to abandon the traditional linear min-max mapping, and a there's a reproducible logic if similar figures are to be made with a different set of numbers that is less subjective. Of course, this approach should be used in conjunction with what the numbers 



principle of ratios:

When you map the following points linearly onto a palette: 1, 10, 500, 800, the point at 10 will not look ten times as "dark" as the point at 1. 



- Lograithmically color-mapping datasets with 0's (or negative's, though this may not yield sensible visuals)
  - Shifting `log(1+x)` for [0, inf) or `log(1+(x+m))` for (-m, inf), where m is the min of your data
  - This works bc we are essentially interested in something 







33_ECI/Analysis

















pg. 3: typo in the “Note” section below Table 1: “quarterly frequency between **202Q1**” is missing a year digit, presumably 



pg 5: top, third column: expected line break before “**Importantly**” for new paragraph



pg 7: top blue blurb, 4th line from the bottom, duplicate **“As As”** 



pg 23: Appendix A Table A1, “Difference” column missing negatives (and mistakenly negatives) in No TRS row **(0.07 should be -0.07, and -0.04 should be 0.04)**, furthermore the (TRS, difference) cell should be **0.03, not 0.08**



pg 25: Appendix A Table A3, first row (No TRS, Difference) should be **+0.15, not -0.15**



pg 31: Appendix B Table 5: (ask Marcos) “**33,8452**” a non-sensical number as std. dev in (Total Payroll, Std. Dev.), four digits after comma (presumably this is measured in dollars)?





