import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ai } from "../../lib/gemini";
// ─── Brand palette ───────────────────────────────────────────────────────────
const BLUE_LIGHT = '#3C9FFE';
const BLUE_MID = '#208AEF';
const BLUE_DARK = '#0274DF';

// ─── Feature grid data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 'sales',
    icon: '💰',
    label: 'Sales Entry',
    desc: 'Record a sale',
    accent: '#10B981',
    bgLight: '#ECFDF5',
    bgDark: '#052e1c',
  },
  {
    id: 'inventory',
    icon: '📦',
    label: 'Inventory',
    desc: 'Manage stock',
    accent: '#8B5CF6',
    bgLight: '#F5F3FF',
    bgDark: '#1e1040',
  },
  {
    id: 'reports',
    icon: '📊',
    label: 'Sales Report',
    desc: 'View analytics',
    accent: '#F59E0B',
    bgLight: '#FFFBEB',
    bgDark: '#2a1f00',
  },
  {
    id: 'payments',
    icon: '💳',
    label: 'Payments',
    desc: 'Track income',
    accent: '#EF4444',
    bgLight: '#FEF2F2',
    bgDark: '#2a0a0a',
  },
  {
    id: 'camera',
    icon: '📷',
    label: 'Camera Scan',
    desc: 'Scan barcode',
    accent: '#0EA5E9',
    bgLight: '#F0F9FF',
    bgDark: '#05192a',
  },
  {
    id: 'analytics',
    icon: '📈',
    label: 'Analytics',
    desc: 'Growth trends',
    accent: '#EC4899',
    bgLight: '#FDF2F8',
    bgDark: '#2a0a1e',
  },
] as const;

// ─── Pulse ring component ────────────────────────────────────────────────────
function PulseRing({ delay }: { delay: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 0 }),
          withTiming(1.8, { duration: 1400 }),
        ),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.55, { duration: 0 }),
          withTiming(0, { duration: 1400 }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.pulseRing, animStyle]} />;
}

// ─── Feature card component ──────────────────────────────────────────────────
function FeatureCard({
  item,
  isDark,
}: {
  item: (typeof FEATURES)[number];
  isDark: boolean;
}) {
  const bg = isDark ? item.bgDark : item.bgLight;

  return (
    <Pressable
  onPress={() => {
    if (item.id === 'sales') router.push('/sales');
    if (item.id === 'inventory') router.push('/inventory');
    if (item.id === 'reports') router.push('/reports');
    if (item.id === 'payments') router.push('/payments');
    if (item.id === 'camera') router.push('/scanner');
    if (item.id === 'analytics') router.push('/analytics');
  }}
  style={({ pressed }) => [
    styles.card,
    { opacity: pressed ? 0.75 : 1 },
  ]}
  android_ripple={{ color: item.accent + '33' }}
>
      <View style={[styles.cardInner, { backgroundColor: bg }]}>
        <View style={[styles.iconCircle, { backgroundColor: item.accent + '22' }]}>
          <Text style={styles.iconEmoji}>{item.icon}</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardLabel, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            {item.label}
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            {item.desc}
          </Text>
        </View>
        <Text style={[styles.cardArrow, { color: item.accent }]}>›</Text>
      </View>
    </Pressable>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = theme.background === '#000000';
const [todaySales, setTodaySales] = useState(0);
const [transactions, setTransactions] = useState(0);
  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
  loadDashboard();
}, []);


const loadDashboard = async () => {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;

  const data = await AsyncStorage.getItem('sales');

  if (data) {
    const sales = JSON.parse(data);

    setTransactions(sales.length);

    const total = sales.reduce(
      (sum: number, item: any) => sum + Number(item.total),
      0
    );

    setTodaySales(total);
  }
};
const startListening = async () => {
  try {
    setIsListening(true);

    await ExpoSpeechRecognitionModule.requestPermissionsAsync();

    await ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
    });
  } catch (error) {
    console.log(error);
    setIsListening(false);
  }
};
  useSpeechRecognitionEvent("result", (event) => {
  console.log(event);

  setIsListening(false);

  if (event.results?.[0]?.transcript) {
    alert(event.results[0].transcript);
  }
});

useSpeechRecognitionEvent("end", () => {
  setIsListening(false);
});
// Voice button scale feedback
  const voiceScale = useSharedValue(1);
  const handleVoicePress = useCallback(() => {
    voiceScale.value = withSequence(
      withTiming(0.92, { duration: 80 }),
      withTiming(1.04, { duration: 120 }),
      withTiming(1, { duration: 100 }),
    );
  }, []);
  const voiceAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: voiceScale.value }],
  }));
const testGemini = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello Gemini, reply with one short sentence.",
    });

    alert(response.text);
  } catch (error) {
    console.log(error);
    alert("Gemini error");
  }
};
  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: insets.bottom + BottomTabInset + Spacing.four },
      ]}
      showsVerticalScrollIndicator={false}>

      {/* ── Hero header ─────────────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.three }]}>
        {/* Logo row */}
        <View style={styles.logoRow}>
          <View style={styles.logoIconWrap}>
            <Text style={styles.logoIcon}>🛍️</Text>
          </View>
          <View>
            <Text style={styles.appName}>Shopy AI</Text>
            <Text style={styles.appTagline}>AI-Powered Shop Assistant</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingWrap}>
          <Text style={styles.greetingText}>{greeting} 👋</Text>
          <Text style={styles.dateText}>{today}</Text>
        </View>

        {/* Stats strip */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{todaySales}</Text>
            <Text style={styles.statLabel}>Today's Sales</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{transactions}</Text>
<Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Items Low</Text>
          </View>
        </View>
      </View>

      {/* ── Voice assistant ──────────────────────────────────────────── */}
      <View style={styles.voiceSection}>
        <Text style={[styles.voiceSectionLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
          AI ASSISTANT
        </Text>

        <View style={styles.voiceButtonWrap}>
          {/* Animated pulse rings */}
          <PulseRing delay={0} />
          <PulseRing delay={450} />
          <PulseRing delay={900} />

          {/* Main voice button */}
        <Pressable onPress={startListening}>
            <Animated.View style={[styles.voiceButton, voiceAnimStyle]}>
              <Text style={styles.voiceMic}>🎤</Text>
            </Animated.View>
          </Pressable>
        </View>

        <Text style={[styles.voiceHint, { color: BLUE_MID }]}>Tap to speak</Text>
        <Text style={[styles.voiceSubHint, { color: isDark ? '#64748B' : '#94A3B8' }]}>
          Ask anything about your shop
        </Text>
      </View>
<View style={{ marginTop: 20, alignItems: "center" }}>
  <Pressable onPress={testGemini}>
    <Text style={{ fontSize: 18 }}>
      Test Gemini AI
    </Text>
  </Pressable>
</View>
      {/* ── Quick actions grid ───────────────────────────────────────── */}
      <View style={styles.gridSection}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>
          Quick Actions
        </Text>

        <View style={styles.grid}>
          {FEATURES.map((item) => (
            <FeatureCard key={item.id} item={item} isDark={isDark} />
          ))}
        </View>
      </View>

      {/* ── AI tip banner ────────────────────────────────────────────── */}
      <View style={styles.tipBanner}>
        <Text style={styles.tipEmoji}>✨</Text>
        <View style={styles.tipText}>
          <Text style={styles.tipTitle}>AI Tip</Text>
          <Text style={styles.tipBody}>
            Use voice commands to quickly add sales entries hands-free.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 0,
  },

  // Header
  header: {
    // @ts-ignore – RN 0.86 / Expo SDK 57 experimental gradient
    experimental_backgroundImage: `linear-gradient(160deg, ${BLUE_DARK} 0%, ${BLUE_MID} 60%, ${BLUE_LIGHT} 100%)`,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  logoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 22,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  appTagline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    marginTop: 1,
  },
  notificationBadge: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 18,
  },

  // Greeting
  greetingWrap: {
    gap: 4,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },

  // Stats strip
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 4,
  },

  // Voice section
  voiceSection: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.two,
  },
  voiceSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: Spacing.two,
  },
  voiceButtonWrap: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: BLUE_MID,
  },
  voiceButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    // @ts-ignore
    experimental_backgroundImage: `linear-gradient(135deg, ${BLUE_LIGHT} 0%, ${BLUE_DARK} 100%)`,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE_MID,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  voiceMic: {
    fontSize: 36,
  },
  voiceHint: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: Spacing.two,
  },
  voiceSubHint: {
    fontSize: 12,
    fontWeight: '400',
  },

  // Grid section
  gridSection: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: Spacing.one,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  card: {
    width: '48.5%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    gap: Spacing.two,
    borderRadius: 16,
    minHeight: 72,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconEmoji: {
    fontSize: 22,
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  cardDesc: {
    fontSize: 11,
    fontWeight: '400',
  },
  cardArrow: {
    fontSize: 22,
    fontWeight: '300',
    lineHeight: 26,
  },

  // Tip banner
  tipBanner: {
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.four,
    // @ts-ignore
    experimental_backgroundImage: `linear-gradient(135deg, ${BLUE_DARK}CC 0%, ${BLUE_MID}CC 100%)`,
    borderRadius: 16,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  tipEmoji: {
    fontSize: 28,
    lineHeight: 36,
  },
  tipText: {
    flex: 1,
    gap: 4,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tipBody: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    fontWeight: '400',
  },
});
