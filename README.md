# 🎮 Arcadia

> **Enter. Play. Connect.**

## 👥 Integrants del projecte

- Eric Ruiz Agustín
- Patrícia Fornieles Rosa
- Adrián Tomás Diez
- Camilo Prado Carrera

---

## 🕹️ Descripció del projecte

**Arcadia** és una plataforma social virtual inspirada en les sales recreatives arcade, on els usuaris poden explorar un món pixelat, interactuar amb altres persones i compartir experiències a través del joc.

Cada usuari disposa d'un avatar que pot moure lliurement pel mapa en temps real, explorar diferents zones i trobar-se amb altres jugadors. La interacció entre usuaris permet iniciar converses, compartir comunicació audiovisual i participar en activitats conjuntes.

El món virtual compta amb diferents espais i elements interactius, com ara màquines recreatives i zones socials, que permeten accedir a minijocs i experiències compartides.

L'objectiu d'Arcadia és crear un espai digital dinàmic, immersiu i social, on jugar i conèixer gent es converteixin en una mateixa experiència.

---

## 📋 Gestió del projecte

El seguiment, l'organització i la planificació de les tasques del projecte es realitzen a través de Taiga.

🔗 [Taiga — Gestió de tasques](https://tree.taiga.io/project/a22eriruiagu-pixelplaza_g3/timeline)

---

## 🎨 Prototip gràfic

El disseny i la planificació visual de la plataforma es poden consultar al prototip desenvolupat amb Penpot.

🔗 [Veure prototip d'Arcadia a Penpot](https://design.penpot.app/?screen=viewer&file-id=7d3e61e0-34c6-81f6-8008-fe72c425859f&page-id=7d3e61e0-34c6-81f6-8008-fe72c42585a0&section=interactions&index=0&share-id=dc636470-5bb4-46b5-a147-8f34203c3708)

---

## 🚀 URL de producció

🔗 [https://arcadia.daw.inspedralbes.cat](https://arcadia.daw.inspedralbes.cat)

---

## 📌 Estat del projecte

**En desenvolupament.**

Actualment, el projecte es troba en fase de planificació i disseny. S'estan definint les funcionalitats principals, l'estructura del món virtual, les interaccions entre usuaris i el disseny de la interfície.

Les següents fases consistiran en el desenvolupament de la plataforma, la implementació de la comunicació en temps real, les interaccions del mapa i els minijocs, així com les proves i el desplegament final.

---

## ⚙️ Com executar el projecte

Només cal tenir **Docker** instal·lat. No cal fer `npm install` ni entrar a cap carpeta.

### Desenvolupament (canvis en calent)

```bash
docker compose -f docker-compose.dev.yaml up
```

- Client (Vue): [http://localhost:5173](http://localhost:5173)
- Backend (Socket.IO): port `3000`

Quan guardes un fitxer, el client s'actualitza sol al navegador i el backend es reinicia automàticament (`node --watch`). Per aturar-ho: `Ctrl + C`.

### Producció

```bash
cp .env.example .env
docker compose up -d --build
```

Els contenidors només escolten a `127.0.0.1`. Al servidor, un Nginx fa de proxy invers amb HTTPS: envia `/` al client i `/socket.io/` al backend.

---

## 🔑 Variables d'entorn

El fitxer `.env` **no es puja al repositori**. Cal crear-lo a partir de `.env.example`.

**`.env`** (arrel del projecte, el fa servir Docker Compose):

| Variable | Exemple | Descripció |
|---|---|---|
| `FRONT_PORT` | `8080` | Port del servidor on s'exposa el client (només a `127.0.0.1`) |
| `BACK_PORT` | `3000` | Port del servidor on s'exposa el backend (només a `127.0.0.1`) |

**`client/.env`** (només per executar el client sense Docker, amb `npm run dev`):

| Variable | Exemple | Descripció |
|---|---|---|
| `VITE_SOCKET_URL` | `http://localhost:3000` | URL del backend. A producció no es posa i es connecta al mateix domini |

---

## 📡 Protocol de comunicació

La documentació del protocol (esdeveniments de Socket.IO) es troba a la carpeta [`doc/`](doc/README.md).