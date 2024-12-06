<script lang="ts" setup>
definePageMeta({
  layout: "internal",
  middleware: "auth",
})

if (import.meta.client) {
  const redirect = localStorage.getItem("redirectTo")
  if (redirect) {
    localStorage.removeItem("redirectTo")
    navigateTo(redirect, {
      replace: true,
    })
  }
}

interface Stat {
  name: string
  value: string | number
  change: number
  icon: string
}

interface RecentActivity {
  id: string
  type: "payment" | "signup" | "error"
  description: string
  timestamp: string
}

const stats: Stat[] = [
  {
    name: "Total Revenue",
    value: "$4,890",
    change: 12.5,
    icon: "heroicons:currency-dollar",
  },
  {
    name: "Active Users",
    value: "1,234",
    change: 8.2,
    icon: "heroicons:users",
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: -2.1,
    icon: "heroicons:chart-bar",
  },
  {
    name: "Avg. Response Time",
    value: "286ms",
    change: 14.3,
    icon: "heroicons:clock",
  },
]

const recentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "payment",
    description: "New subscription from john@example.com",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "signup",
    description: "New user signup - sarah@example.com",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    type: "error",
    description: "Failed payment attempt - Invalid card",
    timestamp: "1 hour ago",
  },
]

function getActivityIcon(type: RecentActivity["type"]) {
  switch (type) {
    case "payment":
      return "heroicons:credit-card"
    case "signup":
      return "heroicons:user-plus"
    case "error":
      return "heroicons:exclamation-circle"
  }
}

function getActivityColor(type: RecentActivity["type"]) {
  switch (type) {
    case "payment":
      return "text-green-500"
    case "signup":
      return "text-blue-500"
    case "error":
      return "text-red-500"
  }
}
</script>

<template>
  <div>
    <main class="max-w-7xl mx-auto pb-8">
      <nav class="mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>
        </div>
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.name" class="rounded-lg p-6 border">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center">
              <Icon :name="stat.icon" class="w-6 h-6 text-gray-400" />
            </div>
            <div class="flex items-center text-sm" :class="stat.change >= 0 ? 'text-green-600' : 'text-red-600'">
              <Icon :name="stat.change >= 0 ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" class="w-4 h-4 mr-1" />
              {{ Math.abs(stat.change) }}%
            </div>
          </div>
          <h3 class="text-sm font-medium dark:text-muted-foreground">{{ stat.name }}</h3>
          <p class="text-2xl font-semibold">{{ stat.value }}</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="rounded-lg">
        <div class="px-6 py-4">
          <h2 class="text-lg font-medium">Recent Activity</h2>
        </div>
        <div class="divide-y divide-border">
          <div v-for="activity in recentActivity" :key="activity.id" class="px-6 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Icon :name="getActivityIcon(activity.type)" class="w-5 h-5" :class="getActivityColor(activity.type)" />
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm">{{ activity.description }}</p>
                <p class="text-sm dark:text-muted-foreground">{{ activity.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button class="p-4 rounded-lg hover: transition-shadow flex items-center justify-center gap-2">
          <Icon name="heroicons:plus-circle" class="w-5 h-5" />
          New Project
        </button>
        <button class="p-4 rounded-lg hover: transition-shadow flex items-center justify-center gap-2">
          <Icon name="heroicons:document-text" class="w-5 h-5" />
          View Reports
        </button>
        <button class="p-4 rounded-lg hover: transition-shadow flex items-center justify-center gap-2">
          <Icon name="heroicons:cog-6-tooth" class="w-5 h-5" />
          Settings
        </button>
      </div>
    </main>
  </div>
</template>
