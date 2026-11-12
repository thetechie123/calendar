export const TOKEN_INFO = {
  general: {
    title: "SSD & DD Tokens",
    subtitle: "Free offline darshan tokens issued in Tirupati",
    category: "Free Darshan",
    mode: "Offline",
    issuedBy: "Tirumala Tirupati Devasthanams (TTD)",
  },

  ssd: {
    id: "ssd",
    name: "Slotted Sarva Darshan",
    shortName: "SSD",
    description:
      "Free offline tokens that assign pilgrims a reporting date and time for Sarva Darshan at Tirumala.",
    centres: [
      {
        id: "srinivasam",
        name: "Srinivasam",
        location: "Near Tirupati Bus Stand",
        mapUrl: "https://www.google.com/maps/place/Srinivasam+Complex/@13.63165,79.42877,17z",
      },
      {
        id: "vishnu-nivasam",
        name: "Vishnu Nivasam",
        location: "Opposite Tirupati Railway Station",
        mapUrl: "https://www.google.com/maps/place/Vishnu+Nivasam/@13.62958,79.42202,17z",
      },
      {
        id: "bhudevi",
        name: "Bhudevi Complex",
        location: "Near Alipiri",
        mapUrl: "https://www.google.com/maps/place/Bhudevi+Complex/@13.6472,79.4097,17z",
      },
    ],
  },

  dd: {
    id: "dd",
    name: "Divya Darshan",
    shortName: "DD",
    description:
      "Free offline darshan tokens associated with the Divya Darshan pedestrian pilgrimage route.",
    centres: [
      {
        id: "bhudevi-dd",
        name: "Bhudevi Complex",
        location: "Separate DD token counter near Alipiri",
        mapUrl: "https://www.google.com/maps/place/Bhudevi+Complex/@13.6472,79.4097,17z",
      },
    ],
  },
};