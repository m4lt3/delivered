<script setup>
import Heading from '@/components/heading.vue';
</script>
<template>
  <v-dialog width="auto">
    <template #activator="{ props }">
      <v-icon icon="mdi-information-outline"  style="margin-right: 1rem" v-bind="props"></v-icon>
    </template>
    <v-card
      title="Good to know"
    >
      <v-card-text>
        <Heading h="2" class="my-2">Stats</Heading>
        <v-table hover>
          <thead>
            <tr>
              <th>Stat</th>
              <th>Description</th>
              <th>Purpose (+1)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Body</td>
              <td>When an action requires might, precision, agility, or speed</td>
              <td>Need to lift heavy things</td>
            </tr>
            <tr>
              <td>Wit</td>
              <td>When an action requires creativity, intellect, or investigation</td>
              <td>Dying to explore</td>
            </tr>
            <tr>
              <td>Social</td>
              <td>When an action requires empathy, humor, or patience</td>
              <td>For the greater good</td>
            </tr>
          </tbody>
        </v-table>

        <Heading h="2" class="my-2">Rolls</Heading>
        <v-table hover>
          <thead>
            <tr>
              <th>Roll</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><b>Absolute Failure:</b> You don’t get what you want and things get a lot worse.</td>
            </tr>
            <tr>
              <td>2</td>
              <td><b>Partial Failure:</b> You don’t get what you want.</td>
            </tr>
            <tr>
              <td>3</td>
              <td><b>Partial Success:</b> You get what you want, but things get complicated.</td>
            </tr>
            <tr>
              <td>4</td>
              <td><b>Absolute Success:</b> You get what you want - and more.</td>
            </tr>
          </tbody>
        </v-table>

        <Heading h="2" class="my-2">Times</Heading>
        <v-table hover>
          <thead>
            <tr>
              <th>Suit</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><v-icon icon="mdi-cards-heart"></v-icon></td>
              <td>6</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-cards-diamond"></v-icon></td>
              <td>8</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-cards-spade"></v-icon></td>
              <td>10</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-cards-club"></v-icon></td>
              <td>12</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
