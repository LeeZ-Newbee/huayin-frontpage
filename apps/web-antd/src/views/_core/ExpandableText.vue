<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  text?: string;
  width?: string; // 最大显示宽度
  maxLength?: number; // 超过多少字符时显示“展开”按钮
  expandText?: string; // “展开”按钮文字
  collapseText?: string; // “收起”按钮文字
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  width: '400px',
  maxLength: 30,
  expandText: '展开',
  collapseText: '收起',
});

const expanded = ref(false);

const showToggle = computed(() => props.text.length > props.maxLength);

const truncatedText = computed(() => {
  if (expanded.value) return props.text;
  if (props.text.length > props.maxLength) {
    return `${props.text.slice(0, props.maxLength)}...`;
  }
  return props.text;
});
</script>

<template>
  <div class="expandable-text" :style="{ maxWidth: width }">
    <!-- 单行省略状态 -->
    <span v-if="!expanded" class="truncate-text" :title="text">
      {{ truncatedText }}
    </span>

    <!-- 展开状态 -->
    <span v-else class="full-text">
      {{ text }}
    </span>

    <!-- 展开/收起按钮 -->
    <a v-if="showToggle" class="toggle-btn" @click="expanded = !expanded">
      {{ expanded ? collapseText : expandText }}
    </a>
  </div>
</template>

<style scoped>
.expandable-text {
  display: inline-flex;
  align-items: center;
  line-height: 1.5;
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
}

.toggle-btn {
  margin-left: 6px;
  cursor: pointer;
  color: var(--primary-color, #409eff);
  user-select: none;
  white-space: nowrap; /* ✅ 防止“展开/收起”两个字折行显示 */
}

.toggle-btn:hover {
  text-decoration: underline;
}
</style>
