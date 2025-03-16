### 🚀 **Fixing 404 Error on Vercel for React Router**  

#### **🔴 Problem Faced**  
After deploying my **React app (KrishiNexus)** on **Vercel**, I encountered a **404 error** when trying to directly access or refresh pages like:  
- `/crop/grapes`  
- `/crop/banana`  
- Any other **dynamic route**  

This happened because Vercel serves only **static files** and doesn’t recognize React Router’s client-side routing. So, when I visited `/crop/grapes`, Vercel **looked for a file or folder named `/crop/grapes` and didn’t find one**, resulting in a 404 error.

---

#### **🛠 How I Fixed It**  
I created a **`vercel.json`** file in the project root with the following configuration:  

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This tells Vercel to:  
✅ Redirect **all requests** to `/` (index.html)  
✅ Allow **React Router to handle** the routing on the client side  
✅ Fix **404 errors on refresh or direct access**  

---

#### **✅ Final Steps**
1. **Added `vercel.json`** in the root directory.  
2. **Re-deployed** the project to Vercel.  
3. **Tested dynamic routes** (`/crop/grapes`, `/event/conference`) — everything worked fine!  

Now, my React app handles **all routes correctly** without breaking. 🚀  

---