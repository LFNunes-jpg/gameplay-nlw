import { ScrollView, StyleSheet } from 'react-native';

import { Category } from './Category';
import { categories } from '../data/categories';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
};

export function CategoryList({ categorySelected, setCategory, hasCheckBox = false }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          checked={category.id === categorySelected}
          hasCheckBox={hasCheckBox}
          onPress={() => setCategory(category.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 120, maxHeight: 120 },
  content: { paddingLeft: 24, paddingRight: 16 },
});
