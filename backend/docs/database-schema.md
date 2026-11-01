\# CourseBuddy Database Schema



CourseBuddy uses MongoDB with Mongoose to store application data.



\## 1. User Collection



| Field | Type | Description |

|---|---|---|

| \_id | ObjectId | Unique user ID |

| name | String | User name |

| email | String | Unique email address |

| password | String | Hashed password |

| role | String | student or admin |

| createdAt | Date | Creation timestamp |

| updatedAt | Date | Last update timestamp |



\## 2. Course Collection



| Field | Type | Description |

|---|---|---|

| \_id | ObjectId | Unique course ID |

| courseName | String | Course name |

| courseCode | String | Unique course code |

| instructor | String | Instructor name |

| duration | String | Course duration |

| category | String | Course category |

| description | String | Course description |

| status | String | Active or Inactive |

| createdAt | Date | Creation timestamp |

| updatedAt | Date | Last update timestamp |



\## 3. Enrollment Collection



| Field | Type | Description |

|---|---|---|

| student | ObjectId | Reference to User |

| course | ObjectId | Reference to Course |

| status | String | active, completed or withdrawn |

| enrolledAt | Date | Enrollment date |

| createdAt | Date | Creation timestamp |

| updatedAt | Date | Last update timestamp |



Unique index: student + course.



\## 4. LearningProgress Collection



| Field | Type | Description |

|---|---|---|

| student | ObjectId | Reference to User |

| course | ObjectId | Reference to Course |

| completedLessons | Number | Completed lessons |

| totalLessons | Number | Total lessons |

| progressPercentage | Number | Completion percentage |

| createdAt | Date | Creation timestamp |

| updatedAt | Date | Last update timestamp |



Unique index: student + course.



\## 5. Notification Collection



| Field | Type | Description |

|---|---|---|

| recipient | ObjectId | Reference to User |

| message | String | Notification message |

| isRead | Boolean | Read status |

| createdAt | Date | Creation timestamp |

| updatedAt | Date | Last update timestamp |



Index: recipient + createdAt.



\## 6. Message Collection



| Field | Type | Description |

|---|---|---|

| sender | ObjectId | Reference to User |

| recipient | ObjectId | Reference to User |

| text | String | Message content |

| createdAt | Date | Creation timestamp |

| updatedAt | Date | Last update timestamp |



Index: sender + recipient + createdAt.



\## 7. Entity Relationship Diagram



```mermaid

erDiagram

&#x20;   USER ||--o{ ENROLLMENT : has

&#x20;   COURSE ||--o{ ENROLLMENT : contains

&#x20;   USER ||--o{ LEARNING\_PROGRESS : tracks

&#x20;   COURSE ||--o{ LEARNING\_PROGRESS : records

&#x20;   USER ||--o{ NOTIFICATION : receives

&#x20;   USER ||--o{ MESSAGE : sends

&#x20;   USER ||--o{ MESSAGE : receives

