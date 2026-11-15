// Fake data copied from the Figma design.
// Replace this with the data coming from your backend.
//
// from: "me"   -> message sent by the logged-in staff member (blue bubble, right)
// from: "them" -> message received (white bubble, left)

export const conversations = [
  {
    id: 1,
    initials: "AR",
    name: "Alex Rivera",
    tag: "1337 Khouribga staff",
    time: "10:24 AM",
    unread: 0,
    online: true,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Hello Sarah! We are excited to welcome the Casablanca Tech Institute delegation to 1337 Ben Guerir this Friday.",
        time: "10:30 AM",
      },
      {
        id: 2,
        from: "them",
        text: "Please ensure all 4 attendees have their National ID cards ready for the Gate 01 electronic turnstiles.",
        attachment: "Security Clearance: Gate 01 Turnstiles Pre-Authorized",
        time: "10:32 AM",
      },
      {
        id: 3,
        from: "me",
        text: "Good morning Hamza. Thank you! All attendee names and documents have been uploaded to the portal.",
        time: "10:38 AM",
      },
      {
        id: 4,
        from: "me",
        text: "Will we be able to visit the Cluster 01 Ada Lovelace lab during the live coding sprint?",
        time: "10:39 AM",
      },
      {
        id: 5,
        from: "them",
        text: "Yes, absolutely! Sofia Benkirane will guide you through both Cluster 01 and the Ideation Pods during the 10:00 AM slot.",
        time: "10:42 AM",
      },
    ],
  },
  {
    id: 2,
    initials: "SJ",
    name: "Sarah Jenkins",
    tag: "Student Ambassador Guide",
    time: "09:40 AM",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Hello, could you confirm the check-in time for our group?",
        time: "09:40 AM",
      },
    ],
  },
  {
    id: 3,
    initials: "IT",
    name: "Campus IT Helpdesk",
    tag: "IT Support",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Your staff portal access permissions have been updated.",
        time: "Yesterday",
      },
    ],
  },
]
