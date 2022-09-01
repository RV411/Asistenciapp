# Asistenciapp

##
# SEQUENCE DIAGRAM

## Admin Register

```mermaid
sequenceDiagram
ADMIN->>+PAGINA_WEB: IngresaDatos()
PAGINA_WEB->>+SERVER: RegistraUsuario()
SERVER->>+DB: GuardaUsuario()
loop Extraccion
  DB->>+DB: GuardaDatos()
end
DB-->>-SERVER:EnviaStatus()
SERVER-->>-PAGINA_WEB: CreaUsuario()
PAGINA_WEB-->>-ADMIN:RegistroExitoso()
```
## Admin Attendance

```mermaid
sequenceDiagram
ADMIN->>+PAGINA_WEB: VizualizaDatos()
PAGINA_WEB->>+SERVER: MostrarUsuario()
SERVER->>+DB: UtilizarServicio()
loop Extraccion
  DB->>+DB: ExtraerDatos()
end
DB-->>-SERVER:EnviarDatos()
SERVER-->>-PAGINA_WEB:UtilizarDatos()
PAGINA_WEB-->>-ADMIN:VizualizaUsuario()
```
##
## User Attendance

```mermaid
sequenceDiagram
ADMIN->>+PAGINA_WEB: IngresarHuella()
PAGINA_WEB->>+SERVER: BuscarHuella()
SERVER->>+DB: BuscarHuellaServicio()
loop Extraccion
  DB->>+DB: ExtraerDatosHuella()
end
DB-->>-SERVER:EnviarDatosHuella()
SERVER-->>-PAGINA_WEB:ComprobarHuella()
PAGINA_WEB-->>-ADMIN:VizualizaAsistencia()
```
##
# CLASS DIAGRAM

```mermaid
classDiagram
    Place <|-- User
    Place <|-- DateAttendance
    Place : +string Id
    Place : +string NamePlace
    Place : +string Street
    Place : +string Department
    Place : +string City
    Place : +string CP
    Place : +string NameChurch
    Place : +number NumPersons
    Place : +Date DateAttendance
    class User{
        +string Id
        -string Name
        +string NameChurch
        +number Attendance
        +string Status
        +string Email
        +number Phone1
        +number Phone2
        +string[] FingerPrint
        +boolean IsAdmin
        +string passwordHash
    }
    class DateAttendance{
        +string Id
        +Date DateAttendance
        +string NamePlace
    }
```

##
# SOFTWARE ARCHITECTURE BY LAYERS

```mermaid
flowchart LR
    subgraph CLIENT
    UI-->COMPONENT
    end
    subgraph CLIENT
    COMPONENT-->SERVICE_HTTPS_REQUEST
    end
    subgraph SERVER
    CONTROLLER-->SERVICE
    end
    SERVICE_HTTPS_REQUEST-->CONTROLLER
    SERVICE-->DATA_BASE
    subgraph DB
    DATA_BASE
    end
```
