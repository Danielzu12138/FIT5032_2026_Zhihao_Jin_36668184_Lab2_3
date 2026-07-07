<!-- JSONLab.vue -->
<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <!-- Activity 6: Render all author names + birth year -->
      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} | Born: {{ author.birthYear }}
        </li>
      </ul>
      
      <h3>Filtering Arrays</h3>
      <p>Authors born after 1850:</p>
      <!-- Activity 7: Render filtered modernAuthors -->
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <!-- Activity 8: Render all famous works flat list -->
        <li v-for="work in allFamousWorks" :key="work">{{ work }}</li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- Activity 9: Render Austen's book list -->
      <ul>
        <li v-for="book in austen?.famousWorks" :key="book">{{ book }}</li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        Company:
        <!-- Activity 9a: Company Name -->
        {{ bookstores.companyName }}
      </p>

      <p>
        Total Stores:
        <!-- Activity 9b: Total store count -->
        {{ bookstores.totalStores }}
      </p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <!-- Activity 10: Loop storeTypes array -->
      <ul>
        <li v-for="typeItem in bookstores.storeTypes" :key="typeItem.type">
          Type: {{ typeItem.type }} | Count: {{ typeItem.count }}
        </li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11: Iterate openingHours key-value -->
      <ul>
        <li v-for="(hours, day) in bookstores.openingHours" :key="day">
          {{ day }}: {{ hours.open }} - {{ hours.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>
      <p>Top Sellers:</p>
      <ul>
        <li v-for="book in bookstores.topSellers" :key="book.id">{{ book.title }}</li>
      </ul>
      <p>We operate in:</p>
      <ul>
        <li v-for="area in bookstores.regions" :key="area">{{ area }}</li>
      </ul>
      <p>Our #1 seller: {{ bookstores.topSellers[0].title }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle message visibility -->
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else>Click the button to see a message.</p>
    </section>

  <section class="lab-section">
    <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
    <p>Highlighting Specific Authors: George Orwell will be highlighted</p>
    <ul>
      <li 
        v-for="author in authors" 
        :key="author.id"
        :class="{ highlight: author.name === 'George Orwell' }"
      >
        {{ author.name }} | Born: {{ author.birthYear }}
      </li>
    </ul>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
// Activity 1: Import JSON files (authors.json and bookstores.json)
import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

const showMessage = ref(false)

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => {
  return authors.filter((author) => author.birthYear > 1850)
})

// Activity 3: Get all famous works (flat all books from all authors)
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title))
);

// Activity 4: Find author by name = "George Orwell"
const orwell = computed(() => {
  return authors.find(author => author.name === "George Orwell")
})

// Activity 5: Find author by ID (Jane Austen id assumed 2, adjust to match your json)
const austen = computed(() => {
  return authors.find(author => author.id === 2)
})
</script>

<style scoped>
.json-lab {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>