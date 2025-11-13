// ===============================
// Equipment System (Frontend Only)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const equipmentContainer = document.getElementById("equipmentList");
  const searchBox = document.getElementById("searchBox");

  // Load equipment from storage
  let equipment = JSON.parse(localStorage.getItem("equipment")) || [];

  // Default sample equipment
  const defaultEquipment = [
    {
      id: 1,
      ownerId: 1763040023978,
      name: "John Deere Tractor",
      type: "Tractor",
      price: 800,
      location: "Pune",
      image:
        "https://media.gettyimages.com/id/1492313039/photo/senior-farmer-driving-a-tractor-on-agricultural-field.jpg?s=612x612&w=0&k=20&c=9uUKEwPon-4yzAXW2B7UDLazhxQ1095ntv-dibHS9H4=",
      description: "High-power tractor best for ploughing, tilling and towing.",
    },
    {
      id: 2,
      ownerId: 1763040023978,
      name: "Harvester Machine",
      type: "Harvester",
      price: 1500,
      location: "Nagpur",
      image: "https://thumbs.dreamstime.com/b/yellow-harvester-11035141.jpg",
      description:
        "Efficient combine harvester suitable for wheat and rice crops.",
    },
    {
      id: 3,
      ownerId: 1763040023978,
      name: "Plough Machine",
      type: "Plough",
      price: 450,
      location: "Nashik",
      image:
        "https://media.istockphoto.com/id/91858682/photo/old-plough.jpg?s=612x612&w=0&k=20&c=cHNf7d88bdC_b7pLJEEK0vb85TT_aVTlj9OAHv_BAX4=",
      description:
        "Heavy-duty plough ideal for soil turning and field preparation.",
    },
    {
      id: 4,
      ownerId: 1763040023978,
      name: "Seed Drill Machine",
      type: "Seeder",
      price: 600,
      location: "Kolhapur",
      image:
        "https://t4.ftcdn.net/jpg/02/01/94/83/360_F_201948344_H2Jyt1ScavG1BQTeqmL9jjWJjxlbA0dI.jpg",
      description:
        "Precision seed drill for accurate crop planting and spacing.",
    },
    {
      id: 5,
      ownerId: 1763040023978,
      name: "Water Pump",
      type: "Pump",
      price: 300,
      location: "Satara",
      image:
        "https://media.gettyimages.com/id/157479767/photo/irrigation-pump.jpg?s=612x612&w=0&k=20&c=f2aCDGwwqKx-w_69kq_lvlc_XyTR7Th5Xod65irh1lM=",
      description:
        "High-pressure water pump ideal for irrigation and spraying.",
    },
    {
      id: 6,
      ownerId: 1763040023978,
      name: "Sprayer Machine",
      type: "Sprayer",
      price: 350,
      location: "Solapur",
      image:
        "https://thumbs.dreamstime.com/b/photo-white-knapsack-sprayer-garden-photo-white-knapsack-sprayer-garden-288830020.jpg",
      description: "Chemical sprayer suitable for pesticides and fertilizers.",
    },
    {
      id: 7,
      ownerId: 1763040023978,
      name: "Rotavator",
      type: "Tiller",
      price: 700,
      location: "Aurangabad",
      image:
        "https://thumbs.dreamstime.com/b/garden-tiller-to-work-man-working-closeup-man-tractor-cultivating-field-spring-71119431.jpg",
      description:
        "Rotavator for seed bed preparation and breaking up hard soil.",
    },
    {
      id: 8,
      ownerId: 1763040023978,
      name: "Mini Tractor",
      type: "Mini Tractor",
      price: 550,
      location: "Mumbai",
      image:
        "https://media.gettyimages.com/id/90947958/photo/a-bright-red-tractor-on-green-grass.jpg?s=612x612&w=0&k=20&c=91gk3OSuLVby1FvbamtogfXYVrmCl3jUSFqetvsFO68=",
      description: "Compact tractor ideal for small farms and orchard work.",
    },
    {
      id: 9,
      ownerId: 1763040023978,
      name: "Baler Machine",
      type: "Baler",
      price: 1400,
      location: "Latur",
      image:
        "https://media.gettyimages.com/id/165894468/photo/farm-equipment-closeup.jpg?s=612x612&w=0&k=20&c=2ospcdc0QHvDqJDQNuwXb0N14kR7vvuaXzS1lBltB34=",
      description:
        "Baler machine for compiling hay, straw, and crop residue efficiently.",
    },
    {
      id: 10,
      ownerId: 1763040023978,
      name: "Power Weeder",
      type: "Weeder",
      price: 380,
      location: "Thane",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2024/11/464067602/XH/EO/FB/28059680/26-mm-wave-blade-weeder-attachment-250x250.jpg",
      description: "Motorized weeder for removing unwanted plants and weeds.",
    },
  ];

  // If empty or incomplete → load defaults
  if (!equipment || equipment.length < 10) {
    localStorage.removeItem("equipment");
    location.reload();
    equipment = defaultEquipment;
    localStorage.setItem("equipment", JSON.stringify(equipment));
  }

  // Function to load equipment list
  function loadEquipment() {
    equipmentContainer.innerHTML = "";

    const query = searchBox.value.toLowerCase();

    const filtered = equipment.filter(
      (eq) =>
        eq.name.toLowerCase().includes(query) ||
        eq.type.toLowerCase().includes(query) ||
        eq.location.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      equipmentContainer.innerHTML =
        "<p style='padding:20px;font-size:18px;color:#555;'>No equipment found.</p>";
      return;
    }

    filtered.forEach((eq) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${eq.image}" alt="${eq.name}">
        <h3>${eq.name}</h3>
        <p>${eq.type}</p>
        <p>₹${eq.price} per hour</p>
        <p>${eq.location}</p>
        <a class="btn" href="../booking/booking.html?equipmentId=${eq.id}">Book Now</a>
      `;

      equipmentContainer.appendChild(card);
    });
  }

  // Load on page start
  loadEquipment();

  // Search listener
  searchBox.addEventListener("input", loadEquipment);

  // Expose function for button
  window.loadEquipment = loadEquipment;
});
