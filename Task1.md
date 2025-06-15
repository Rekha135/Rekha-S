***Task 1 – Exploratory Testing - GoodBudget Web***

**Charter 1: User sign-up & Login**
- Priority: High - functionality required to access the app
- Findings:
- Successfully sign-up and login
- Welcome Email is sent to registered mail and help login mail is sent to mailID for reset password
- No Specification at Sign up (For username and Password field for error)

**Charter 2: Adding, Editing & Deleting account**
- Priority: High - Important for adding funds to envelopes
- Findings:
- Able to add one saving account and two Debt accounts for free
- Added accounts can be seen in accounts tab in home screen with transaction details

**Charter 3: Explore Envelopes by Adding, Editing and deleting**
- Priority: High - Core functionality of the application
- Findings:
- Able to create new Envelope categories
- Envelopes can be filled with Add/Set

**Charter 4: Add transaction**
- Priority: High - Critical for budget tracking
- Findings:
- Can add income and expenses
- Visually can see all the transactions

**Charter 5: Reports Functionality**
- Priority: Medium
- Findings:
- Data in the graph reports reflects the transactions and balances.
- Changes in transactions are reflected

**Charter 6: Verify My Household**
- Priority: Medium
- Findings:
- Able to see the account details

**Identified Bugs**

*High Severity*
1. **Login Fields:** No clear error messages or requirement guidelines found

*Medium Severity*
1. **Transaction Logic:** Negative values breaks the calculation (e.g., -50 converts $100 → $150)
2. **Firefox Responsive:**
    - Reports dropdown fails
    - Welcome message overflow ("Hi, Rekha")

*Low Severity*
1. **UI Inconsistency:** Intermittent "Show Password" icon during sign-up
2. **Mobile Layout:** Excessive whitespace between accounts/transactions
3. **Duplicate Links:** Redundant "Scheduled transactions" links without corresponding regular transactions view
2. **Account Deletion:** "Save Changes" blocked by premium version (the dialog box for purchasing premium appears intermittently)

**Risk Assessment & Mitigation**

1. Authentication Risk:
    - No ID verification during registration exposes sensitive information (bank linking, CSV export)
    - **Mitigation:** Implement multi-factor authentication
2. Mobile Responsiveness:
    - UI elements don't fit the mobile view (Add/Edit Envelopes, Reports)
    - **Mitigation:** Enforce 100% zoom compatibility without scrolling
3. Data Exposure:
    - APIs leak sensitive data in responses (emails/passwords)
    - **Mitigation:** We should consider applying field-level encryption

**Browser dev-tools Comments**
**Network Calls**
1. REST calls made over HTTPS
2. All methods actions visible in /api/v1 (<https://goodbudget.com/api/transactions>)

**Security/privacy aspects of cookies and localStorage**
1. GBSESS (session identifier) is stored in a cookie that is not marked as HttpOnly, making it vulnerable to session hijacking. It should be secured using the HttpOnly and Secure flags.
2. Behavioural data such as envelope details, transaction IDs, or budget plans are stored in localStorage, which is accessible via JavaScript and poses a security risk.
3. Third-party trackers (e.g., AdRoll, TapAd) set long-lived cookies and should be blocked unless explicitly consented to by the user.

**Performance**
1. Home Page (/home)
Desktop Score: 81%, Mobile Score: 45%
2. Account Edit Page (/account/edit)
Desktop Score: 79%, Mobile Score: 42%
- *Note:* Mobile performance suffers from layout shifts

**Accessibility (AxeDev Tool)**
1. Critical: Elements fail color contrast requirements
2. Navigation: Links lack discernible text