import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const BLUE_MID = '#208AEF';
const BLUE_DARK = '#0274DF';
const BLUE_LIGHT = '#3C9FFE';

const REPORT_ITEMS = [
  { icon: '📅', label: 'Daily Report', desc: 'View today\'s full summary', accent: '#10B981' },
  { icon: '📆', label: 'Weekly Report', desc: 'Last 7 days performance', accent: '#8B5CF6' },
  { icon: '🗓️', label: 'Monthly Report', desc: 'Month-to-date overview', accent: '#F59E0B' },
  { icon: '📉', label: 'Profit & Loss', desc: 'Revenue vs expenses', accent: '#EF4444' },
  { icon: '🏆', label: 'Top Products', desc: 'Best selling items', accent: '#0EA5E9' },
  { icon: '👥', label: 'Customer Trends', desc: 'Buyer patterns & loyalty', accent: '#EC4899' },
] as const;

export default function ReportsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = theme.background === '#000000';

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
        },
      ]}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerInner, { paddingTop: Spacing.four }]}>
          <Text style={styles.headerTitle}>Reports</Text>
          <Text style={styles.headerSub}>Sales intelligence & analytics</Text>
        </View>
      </View>

      {/* Period selector */}
      <View style={[styles.periodRow, { borderBottomColor: isDark ? '#1E293B' : '#E2E8F0' }]}>
        {['Today', 'Week', 'Month', 'Year'].map((p, i) => (
          <Pressable
            key={p}
            style={[
              styles.periodBtn,
              i === 0 && { backgroundColor: BLUE_MID, borderRadius: 20 },
            ]}>
            <Text
              style={[
                styles.periodLabel,
                { color: i === 0 ? '#FFFFFF' : isDark ? '#94A3B8' : '#64748B' },
              ]}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Summary cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: isDark ? '#0F2744' : '#EFF6FF' }]}>
          <Text style={[styles.summaryValue, { color: BLUE_MID }]}>₦0</Text>
          <Text style={[styles.summaryLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Revenue
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: isDark ? '#052e1c' : '#ECFDF5' }]}>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>₦0</Text>
          <Text style={[styles.summaryLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Profit
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: isDark ? '#2a1f00' : '#FFFBEB' }]}>
          <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>0</Text>
          <Text style={[styles.summaryLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Orders
          </Text>
        </View>
      </View>

      {/* Report list */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>
          Report Types
        </Text>

        <View style={[styles.reportList, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC', borderColor: isDark ? '#1E293B' : '#E2E8F0' }]}>
          {REPORT_ITEMS.map((item, idx) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.reportRow,
                { opacity: pressed ? 0.7 : 1 },
                idx < REPORT_ITEMS.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? '#1E293B' : '#E2E8F0',
                },
              ]}
              android_ripple={{ color: item.accent + '22' }}>
              <View style={[styles.reportIcon, { backgroundColor: item.accent + '20' }]}>
                <Text style={styles.reportEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.reportText}>
                <Text style={[styles.reportLabel, { color: isDark ? '#F1F5F9' : '#0F172A' }]}>
                  {item.label}
                </Text>
                <Text style={[styles.reportDesc, { color: isDark ? '#64748B' : '#94A3B8' }]}>
                  {item.desc}
                </Text>
              </View>
              <Text style={[styles.reportArrow, { color: item.accent }]}>›</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Export banner */}
      <View style={styles.exportBanner}>
        <Text style={styles.exportEmoji}>📤</Text>
        <View style={styles.exportText}>
          <Text style={styles.exportTitle}>Export Reports</Text>
          <Text style={styles.exportBody}>
            Download as PDF or share via WhatsApp
          </Text>
        </View>
        <Pressable style={styles.exportBtn}>
          <Text style={styles.exportBtnLabel}>Export</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { gap: 0 },

  header: {
    // @ts-ignore
    experimental_backgroundImage: `linear-gradient(160deg, ${BLUE_DARK} 0%, ${BLUE_MID} 60%, ${BLUE_LIGHT} 100%)`,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  headerInner: { gap: 4 },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },

  periodRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
    borderBottomWidth: 1,
  },
  periodBtn: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
  },
  periodLabel: {
    fontSize: 13,
    fontWeight: '600',
  },

  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 14,
    padding: Spacing.three,
    alignItems: 'center',
    gap: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
  },

  section: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    paddingHorizontal: Spacing.one,
  },
  reportList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  reportIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reportEmoji: { fontSize: 20 },
  reportText: { flex: 1, gap: 2 },
  reportLabel: { fontSize: 14, fontWeight: '600' },
  reportDesc: { fontSize: 12, fontWeight: '400' },
  reportArrow: { fontSize: 22, fontWeight: '300', lineHeight: 26 },

  exportBanner: {
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.four,
    // @ts-ignore
    experimental_backgroundImage: `linear-gradient(135deg, ${BLUE_DARK}CC 0%, ${BLUE_MID}CC 100%)`,
    borderRadius: 16,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  exportEmoji: { fontSize: 28 },
  exportText: { flex: 1, gap: 4 },
  exportTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  exportBody: { fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 17 },
  exportBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
  },
  exportBtnLabel: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
});
