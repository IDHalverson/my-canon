# MyCanon  
   
### The canonical video library builder.  

---
  
## Architectural Decision Record  
  
### TypeScript  
I chose to use TypeScript for a few reasons. One is that I'm used to it. Another is that I have personally enjoyed the benefits of strongly typed code and feel it reduces bugs significantly. A third reason is I wanted to see how difficult it would be to use TypeScript when working at a pretty low level in regards to the DOM and native browser APIs. My conclusion that TypeScript is superior was not altered.
  
### Lit Context
I chose to use Lit Context because it was recommended by the Lit docs. Therefore it seems to considered a reliable tool. I also knew there would be good reasons for using a pattern of subscribing to state. For example, I used context to implement feature flags and toast messages. It would have been much more complex or inefficient without a subscription pattern, in my opinion. Using Lit Context also allows you to put all your state management types, logic, etc. into one place (e.g. the context/ folder), which is very useful as opposed to looking around at components trying to remember which one was holding a state() property you need.  



