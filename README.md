# Installation

### Clone Repository

```bash
git clone git@github.com:chulander/inxeption.git
```

### Install Dependencies

```bash
cd inxeption
npm i
```

### Setup Environemental Variables

```bash
touch .env
```

DB_NAME=ANY_STRING

### Run Test

```bash
npm test
```

### Dev Server

```
npm run dev
```

### Production

```bash
npm run build
npm run prod
```

# Endpoints

### Employee

Employee Interface --> src/db/types

**GET**
/api/employee/:id

**POST**
/api/employee --> { id: number }

### Activity

Activity Interface --> src/db/types

**GET**
/api/activity --> Activity[]
/api/activity/:id --> Activity[]
/api/activity/employee/:employee_id--> Activity[]

**POST**
/api/activity --> { id: number}

