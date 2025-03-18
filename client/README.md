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

### Question: 🔴
Why should data fetching be done inside `useEffect` and not directly in the body of a React component?

### Answer: 🚀
>Suppose we are fetching weather data directly inside a React component using the `fetch` method without using `useEffect`. Once the data is loaded, we store it in a state using `useState`. Now, we know that whenever the state changes, the component re-renders.  

>When the component re-renders, it will again call the `fetchWeather` function, which will again update the state using `setWeather`. This state change triggers another re-render, causing the fetch call to repeat infinitely, leading to an infinite loop. This means the component will continuously fetch data, update the state, and re-render repeatedly.  

>Now, another question arises: why use `useState` to store data instead of saving it directly? The reason is that you would also need a loading state to display “Loading…” until the data is fetched. Once the data is loaded, you set the loading state to `false`, which triggers a re-render to display the actual weather data instead of "Loading…".  

>Another thought could be: what if we avoid using `useState` for the loading state as well? If you do that, the data will be fetched internally, but the UI will not update properly. It will keep displaying “Loading…” because React will not know when to re-render. This happens because, according to React’s theory, for any changing data to reflect in the UI, the component must re-render. The `useState` hook is what tells React that a state change has occurred and that the component needs to update.  

>If you fetch data without `useEffect`, a new fetch request will be sent on every re-render. This causes unnecessary network requests, leading to performance issues and network overload. That’s why we use `useEffect` with an empty dependency array `[]`, ensuring the fetch call runs only once when the component mounts.

### NOTE: ab hindi me samjho.
> Man lo hum data fetch kar rhe hai weather data ka direct component ke andar fetch method ka karke, bina *useEffect* ke. Toh jab data load ho jayega toh hum usko ek state ke andar rakhenge *useState* ka use karke. ab hum jante hai ki jab state change hoga toh component re-render hoga. **Aur  jab re-render hoga toh firse wether fetching call ho jayega, aur ye prakriya bar-bar repeat hoga , aur isse banega infinite loop (yani ki component bar bar re-reder hoga , har bar fetchWeather call hoga, aur har bar setWeather call hoga aur state chnage hoga).** 

> Ab ek aur sawal aata hai ki useState use kyu kare direct data kyu na save kar le. Toh munna , isme bhi ek toh hai, ki tum ek loding state banaoge taki jab tak data load na ho tab tak *data is loading* dikhata rhe, aur jaise hi tum data load karke loading state ko false karoge toh component re-render ho jayega. 

>  Ab ek aur aayega dimag is loading sate ko bhi useState ke bina kare. toh tumara internally data toh ho jayega , but UI pr reflect nahi hoga waha pr toh *data is loading* hi show karega. Kyoki useState ka theory padho wo kya bolta hai, ki toh changing data ko show karna hai toh, component re-render karna padega. aur component kis data ke change hone pr re-render ho wahi toh useState batata hai.

> Agar bina `useEffect` ke fetch call karoge, toh **har re-render pe** naya fetch request jayega, jo **network overload** aur **performance issue** create karega. Isliye **`useEffect` ka use karke dependency array `[ ]` pass karte hain** taki fetch **sirf ek baar ho** (component mount hone par). 