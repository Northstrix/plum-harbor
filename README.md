# Plum Harbor
An experimental file sharing app built using Next.js and Perplexity that enables the users to easily share, receive, send, and resend files. The app employs ML-KEM-1024, ChaCha20, Serpent-256, and HMAC-SHA512 to ensure data confidentiality and integrity. The app is also equipped with a dedicated password vault.

Check it out at https://plum-harbor.netlify.app/

SourceForge page: https://sourceforge.net/p/plum-harbor/

Codeberg page: https://codeberg.org/Northstrix/plum-harbor

![Alt Homepage English](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/Homepage.png?raw=true)

![Alt Available Localizations](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/Available%20localizations.png?raw=true)

![Alt Shared Files English](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/Shared%20Files%20Tab.png?raw=true)

![Alt Shared Files Hebrew](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/Shared%20Files%20(Hebrew,%20Very%20smooth%20corners).png?raw=true)

![Alt File Processing Pop-Up](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/File%20processing%20pop-up.png?raw=true)

![Alt File Processing Pop-Up RTL Version](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/File%20processing%20pop-up%20(rtl%20version).png?raw=true)

![Alt Logout Pop-UP Modal](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/Logout%20pop-up%20modal.png?raw=true)

![Alt File Type Classification](https://github.com/Northstrix/plum-harbor/blob/main/screenshots/File%20type%20classification.png?raw=true)


# Firestore Rules

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
    
        // Match the user's private directory
        match /data/{userEmail}/private/{document=**} {
          allow read, write: if request.auth != null && request.auth.token.email == userEmail;
        }
    
        // Match the user's public directory
        match /data/{userEmail}/public/{document=**} {
          allow read: if true; // Anyone can read
          allow write: if request.auth != null && request.auth.token.email == userEmail; // Only the user can write
        }
    
        // Match the received files directory
        match /data/{userEmail}/receivedFiles/{document=**} {
          allow read: if request.auth != null && request.auth.token.email == userEmail; // Only the user can read
          allow write: if request.auth != null; // Any authenticated user can write
        }
      }
    }

# Credit

The existence of this project (at least in its current form) wouldn't've been possible without the following:

[Text Reveal Animation](https://codepen.io/swatiparge/pen/LYVMEag) by [Swati Parge](https://codepen.io/swatiparge)

[Text scroll and hover effect with GSAP and clip](https://codepen.io/Juxtopposed/pen/mdQaNbG) by [Juxtopposed](https://codepen.io/Juxtopposed)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Named scroll-timeline vertical](https://codepen.io/utilitybend/pen/VwBRNwm) by [utilitybend](https://codepen.io/utilitybend)

[tabler-icons](https://github.com/tabler/tabler-icons) by [tabler](https://github.com/tabler)

[Fontsource Roboto Mono](https://www.npmjs.com/package/@fontsource/roboto-mono) by [fontsource](https://github.com/fontsource)

[Copyright 2015 The Roboto Mono Project Authors](https://github.com/googlefonts/robotomono)

[Fontsource Alef](https://www.npmjs.com/package/@fontsource/alef) by [fontsource](https://github.com/fontsource)

[Copyright (c) 2012, HaGilda & Mushon Zer-Aviv](http://alef.hagilda.com%7Calef@hagilda.com/)

[sweetalert2](https://github.com/sweetalert2/sweetalert2) by [sweetalert2](https://github.com/sweetalert2)

[animate-css](https://github.com/animate-css/animate.css) by [animate-css](https://github.com/animate-css/animate.css)

[react-i18next](https://github.com/i18next/react-i18next) by [i18next](https://github.com/i18next)

[hash-wasm](https://github.com/Daninet/hash-wasm) by [Daninet](https://github.com/Daninet)

[firebase-js-sdk](https://github.com/firebase/firebase-js-sdk) by [firebase](https://github.com/firebase/firebase-js-sdk)

[mipher](https://github.com/mpaland/mipher) by [mpaland](https://github.com/mpaland)

[Pure CSS Tabs With Indicator](https://codepen.io/woranov/pen/NRqLWK) by [woranov](https://codepen.io/woranov)

[crystals-kyber-js](https://github.com/dajiaji/crystals-kyber-js) by [dajiaji](https://github.com/dajiaji)

[深海なボタン](https://codepen.io/ash_creator/pen/GRGZYyV) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[rémi's pop-up](https://codepen.io/Gthibaud/pen/MqpmXE) by [Tibo](https://codepen.io/Gthibaud)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Interactive Loose-Leaf Todo List](https://codepen.io/IanWoodard/pen/eYyVzzq) by [Ian](https://codepen.io/IanWoodard)

[Named scroll-timeline vertical](https://codepen.io/utilitybend/pen/VwBRNwm) by [utilitybend](https://codepen.io/utilitybend)

[The prismatic forms](https://codepen.io/nourabusoud/pen/BxJbjJ) by [Nour Saud](https://codepen.io/nourabusoud)

[Vercel app border hover effect](https://codepen.io/Juxtopposed/pen/xxQNozB) by [Juxtopposed](https://codepen.io/Juxtopposed)

[Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity](https://ui.aceternity.com/)

[Custom Progress Bar](https://codepen.io/FlorinPop17/pen/yLyzmLZ) by [Florin Pop](https://codepen.io/FlorinPop17)

[Diagonal Lines Background Animation Pure CSS](https://codepen.io/alvarotrigo/pen/yLxxxJZ) by [Álvaro](https://codepen.io/alvarotrigo)

[JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)

[Course design cards #scss](https://codepen.io/kristen17/pen/NPKrxBd) by [Kristen](https://codepen.io/kristen17)

[Design Courses Darshboard Design](https://dribbble.com/shots/14951981-Design-Courses-Darshboard-Design/attachments/6669266?mode=media) by [Hira Riaz🔥](https://dribbble.com/Hirariaz4)

[Toolbars With Sliding Selection](https://codepen.io/jkantner/pen/OJKZxpv) by [Jon Kantner](https://codepen.io/jkantner)

[Gsap Slider](https://codepen.io/yudizsolutions/pen/YzgXvZJ) by [Yudiz Solutions Limited](https://codepen.io/yudizsolutions)

</br>

Home page design is inspired by [EmailThing](https://emailthing.app)
