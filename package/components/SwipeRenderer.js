import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PagerView from "react-native-pager-view";
import DynamicRenderer from "./DynamicRenderer";
import { useGlobal } from "../context/context";

export default function SwipeRenderer({ pages = [], config, iconMap }) {
  const pagerRef = useRef(null);
  const { currentPage, setCurrentPage } = useGlobal();

  const onPageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  // 👇 Add this effect
  useEffect(() => {
    if (pagerRef.current && typeof currentPage === "number") {
      pagerRef.current.setPage(currentPage);
    }
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {pages.map((item, index) => (
          <ScrollView key={item.id ?? index} showsVerticalScrollIndicator={false}>
            <View style={styles.page}>
              <DynamicRenderer item={item} config={config} iconMap={iconMap} />
            </View>
          </ScrollView>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pager: { flex: 1 },
  page: { flex: 1, width: "100%" },
});
