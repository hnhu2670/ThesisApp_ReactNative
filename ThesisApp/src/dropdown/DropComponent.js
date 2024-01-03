import React from 'react'
import styles from '../component/thesis/style'
import { Dropdown } from 'react-native-element-dropdown'

const DropComponent = () => {
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            maxHeight={300}
            labelField="label"
            valueField="value" // Trường giá trị hiển thị
            // data={data5}
            // value={getDefault5}
            placeholder="Chọn giảng viên"
            searchPlaceholder="Tìm tên giảng viên..."
        // onSelect={defaultSelet}

        />
    )
}

export default DropComponent